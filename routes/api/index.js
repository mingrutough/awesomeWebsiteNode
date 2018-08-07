import Router from 'koa-router';
const router = new Router();
import todoApi from './todo';

router.use(todoApi.routes()); // 引入todolist的系列api

export default router;