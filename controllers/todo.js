

import { todoModel } from '../mongo/models';

const todo = {
  getList: async (ctx, next) => { 
    try {
      ctx.data = await todoModel.find({}).sort({'_id': -1});
    } catch (err) {
        ctx.data.error = err;
        console.log('err', err);
    }
  },
  addList: async (ctx, next) => {
    const { text,priority,progress, _id } = ctx.request.body;
    if (_id) { // 修改
      try {
        ctx.data = await todoModel.findByIdAndUpdate(_id, {
          text,
          priority,
          progress,
          updateTime: new Date(),
        });
      } catch (err) { 
        ctx.data.error = err;
        console.log('err', err);
      }
    } else { // 新增
      const todoEntity = new todoModel({
        text,
        priority,
        progress,
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
    }
  },
  deleteList: async (ctx, next) => { 
    const { _id } = ctx.request.query;
    try {
      ctx.data = await todoModel.findByIdAndRemove(_id); 
    } catch (err) { 
        ctx.data.error = err;
        console.log('err', err);
    }
  },
};

export default todo;