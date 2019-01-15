import Router from 'koa-router';
const router = new Router();
import todoApi from './todo';
import userApi from './user';

router
  .use(todoApi.routes()) // 引入todolist的系列api
  .use(userApi.routes()); // 

export default router;