
import mongoose from 'mongoose';

import db from '../index';

// status 为0表示未完成，为1表示已完成
const todoSchema = new mongoose.Schema({
  text: String,
  status: Number,
  priority: String,
  progress: Number,
  createTime: Date,
  updateTime: Date,
});

const todoModel = db.model('todo', todoSchema);

export default todoModel;