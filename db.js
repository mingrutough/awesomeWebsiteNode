
import mongoose from 'mongoose';

const DB_URL = 'mongodb://111.230.206.242/test';
mongoose.connect(DB_URL);

const db = mongoose.connection;

db.on('connected', () => { 
  console.log('Mongoose connection open to ' + DB_URL);
})

db.on('error', (err) => { 
  console.log('Mongoose connection error: ' + err);
})