
import Router from 'koa-router';

const router = new Router();

router.get('/hah', (ctx, next) => {
  ctx.response.body = 'xixiix'
});

export default router;