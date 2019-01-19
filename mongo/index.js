
import { dbConf } from '../config';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DB_URL = `mongodb://${dbConf.db.userName}:${dbConf.db.passWord}@${dbConf.ip}/${dbConf.db.name}`; 
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

export { Schema };
export default db;
