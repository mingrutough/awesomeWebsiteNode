import Router from 'koa-router';
import { user } from '../../controllers';

const router = new Router();

router
  .post('/logIn', user.logIn)
  .post('/logOut', user.logOut)
  .get('/isLogIn', user.isLogIn)  
  .get('/userInfo', todo.getUserInfo);

export default router;