import {connect} from 'mongoose';

const mongodb_url = process.env.MONGODB_URL || 'mongodb+srv://sergiomelladomartin:CDfrX4D1qn4X3HQt@cluster0.hlswq6y.mongodb.net/test';

connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});