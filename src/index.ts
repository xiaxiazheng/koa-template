import * as path from "path";
import Koa = require("koa");
import json = require("koa-json");
import bodyparser = require("koa-bodyparser");
import cors = require("koa2-cors");
import Router = require("koa-router");
import koastatic = require("koa-static");

const app = new Koa();

// 使用中间件解析 ctx.body
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);

app.use(json());

// 配置静态资源目录
app.use(
    koastatic(path.resolve(__dirname, "../public"), {
    maxage: 31536000,
  })
);

// 跨域访问组件，允许跨域访问
app.use(
  cors({
    origin: () => {
      return "*";
    },
    allowMethods: ["GET"],
  })
);

// 路由配置
const router = new Router();

router.prefix("/api");

router.get("/helloworld", async (ctx) => {
  ctx.body = "helloworld";
});

router.post("/helloworld", async (ctx) => {
  ctx.body = "helloworld";
});

app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务
app.listen(3000, () => {
  console.log("listen on localhost:3000");
});
