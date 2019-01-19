import Router from 'koa-router';
import { user } from '../../controllers';

const router = new Router();

router
  .post('/logIn', user.logIn)
  .post('/logOut', user.logOut)
  .post('/register', user.register)  
  .get('/isLogIn', user.isLogIn)  
  .get('/userInfo', user.getUserInfo);

export default router;