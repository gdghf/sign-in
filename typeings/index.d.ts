import * as Koa from "koa";

//for ctx.request.body
declare module "koa" {
    interface Request {
        body: any;
    }
}

//for ctx.shop
declare module "koa" {
    interface Context {
        shop: any;
    }
}