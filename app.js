
// 项目入口
import Koa from 'koa';
import bodyParser from 'koa-bodyparser'; 
import router from './routes'; // 项目路由统一存放处
import mongo from './mongo'; // 项目mongodb数据库相关配置
import { responseHandler } from './middlewares';

const app = new Koa();

// 对所有的api返回做统一处理
app.use(responseHandler);
// 用于解析http请求体中的数据
app.use(bodyParser());

app.use(router.routes())
app.use(router.allowedMethods());

const port = process.env.PORT || '3102';
app.listen(port);
console.log('Server listening on ' + port);