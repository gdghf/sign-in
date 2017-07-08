/// <reference types="../typeings/" />

import * as fs from 'fs';
import * as path from 'path';
import * as Koa from "koa"
import * as body from 'koa-body';
import * as logger from 'koa-logger';
import * as jwt from 'koa-jwt';
import { config } from './config';
import { createConnections } from "typeorm";
import "reflect-metadata";

//建立与数据库的链接
createConnections().then(async connection => {

	const app = new Koa();

	// 中间件
	app.use(body());
	app.use(logger());

	app.use(async (ctx, next) => {

		const start = Date.now();

		try {

			await next();
		} catch (error) {

			error.status = error.status || 500;

			ctx.status = error.status;
			ctx.body = error.status == 401 ? { code: -401, msg: '未登录' } : error.message;

			error.status.toString().startsWith('5') && ctx.app.emit('error', error, ctx);
		}

		const ms = Date.now() - start;
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
	});

	//采用jwt用户认证
	app.use(jwt({ secret: new Buffer(config.secrets, 'base64'), cookie: 'auth' }).unless({ path: [/^\/users/] }));

	//加载所有路由
	{
		let routes = function (address: string) {

			fs.readdir(address, (error, files) => {

				files.forEach(e => {

					let p = path.join(address, e);
					let info = fs.statSync(p);

					if (info.isDirectory()) return routes(p);
					if (!e.endsWith('.js')) return;

					var tmp = require(path.join(address, e));
					
					app.use(tmp.routes());
				});
			});
		};

		routes(path.join(__dirname, 'routes'));
	}

	//服务错误
	app.on('error', (error, ctx) => {

		console.log(error);
	});

	//服务启动
	var port = config.port;
	app.listen(port, () => {

		console.log('合肥GDG活动管理服务启动于：%s', port);
	});

}).catch(error => console.log("db connection error: ", error));