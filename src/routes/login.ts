import * as Router from 'koa-router';
import * as moment from 'moment';

const router = new Router({ prefix: '/users' });

/**
 * @api {post} /users/login  用户登录
 * @apiGroup login
 * 
 * @apiSuccessExample {json} 成功
 * {
 *      code: 200,
 *      msg: "退出成功",
 * }
 * 
 * @apiErrorExample {json} 失败
 * {
 *      code: -100,
 *      msg: '用户名或密码不能为空/用户名或密码不正确'
 * }
 */
router.post('/login', async (ctx, next) => {


    return ctx.body = { code: 1, msg: '登录成功' };
});

/**
 * @api {post} /users/logout  用户登出
 * @apiGroup login
 * 
 * @apiSuccessExample {json} 返回值
 * {
 *      code: 200,
 *      msg: "退出成功",
 * }
 */
router.post('/logout', (ctx, next) => {

    ctx.cookies.set('auth', null, { expires: moment().add(-1, 'days').toDate() });
    ctx.body = { code: 1, msg: '退出成功' };
});

export = router;