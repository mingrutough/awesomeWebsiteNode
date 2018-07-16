
import { DBCONF }from '../config';

import mongoose from 'mongoose';

const DB_URL = 'mongodb://mingru:mingrutough@111.230.206.242/mBlogDev'; // 我的用户名密码
mongoose.connect(DB_URL);

const db = mongoose.connection;

/**
  * 连接成功
  */
db.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
db.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
db.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    