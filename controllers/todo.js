

import { todoModel } from '../mongo/models';

const todo = {
  getList: async (ctx, next) => { 
    ctx.data = await todoModel.find();
  },
  addList: async (ctx, next) => {
    const { text } = ctx.request.body;
    const todoEntity = new todoModel({
      text,
      status: 0,
      createTime: new Date(),
      updateTime: new Date(),
    });
    try {
      ctx.data = await todoEntity.save();
    } catch (err) { 
      ctx.data.error = err;
      console.log('err', err);
    }
  },
  deleteList: async (ctx, next) => { 
    ctx.data = {'fdsa': 'fafa'};
  },
};

export default todo;