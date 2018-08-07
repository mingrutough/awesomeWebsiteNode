import Router from 'koa-router';
import apiRouter from './api'; // 所有的api集合

const router = new Router({ // 给接口加上api前缀
  prefix: '/api'
});

router.use(apiRouter.routes());

export default router;