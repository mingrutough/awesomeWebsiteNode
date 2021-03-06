
// 项目入口
import Koa from 'koa';
import path from 'path';
import bodyParser from 'koa-bodyparser'; 
import session from 'koa-session';
import cors from 'koa2-cors'; // 配置项目使之支持跨域访问
import koaStatic from 'koa-static'; // 配置项目静态资源目录
import router from './routes'; // 项目路由统一存放处
import mongo from './mongo'; // 项目mongodb数据库相关配置
import { responseHandler }  from './middlewares';
import { sessionConf } from './config';
const app = new Koa();
const staticPath = './static';

// session配置
app.keys = ['mingrutough'];
app.use(session(sessionConf, app));
// 对所有的api返回做统一处理
app.use(responseHandler);
// 静态资源目录对于相对入口文件app.js的路径
app.use(koaStatic(
  path.join(__dirname, staticPath) // 得到项目静态资源目录的绝对路径
));

// 跨域访问注意默认跨域是不支持设置cookie的，需要前端withCredentials: true，后端credentials:true
app.use(cors({
  origin: 'http://localhost:3018',
  credentials: true,
}));
// 用于解析http请求体中的数据
app.use(bodyParser());
app.use(router.routes());

// allowedMethods这个函数其实就是当所有中间件函数执行完了，并且请求出错了进行相应的处理.
// 1.如果请求的方法koa - router不支持并且没有设置throw选项，则返回 501(未实现)

// 2.如果是options请求，则返回 204(无内容)

// 3.如果请求的方法支持但没有设置throw选项，则返回 405(不允许此方法 )
app.use(router.allowedMethods());


const port = process.env.PORT || '3102';
app.listen(port);
console.log('Server listening on ' + port);