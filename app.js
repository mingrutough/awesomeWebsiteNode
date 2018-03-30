
// 项目入口
import Koa from 'koa';
import Router from 'koa-router';
import routes from './routes'; // 项目路由统一存放处

const app = new Koa();
const router = new Router();


router.use('', routes.routes());

app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || '3102';
app.listen(port);
console.log('Server listening on ' + port);