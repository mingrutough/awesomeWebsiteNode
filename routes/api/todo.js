import Router from 'koa-router';
import { todo } from '../../controllers';

const router = new Router();

router
  .get('/todoList', todo.getList)
  .post('/todoList', todo.addList)
  .delete('/todoList', todo.deleteList);

export default router;