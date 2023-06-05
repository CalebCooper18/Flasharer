import express from 'express';
import config from './utils/config';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRoute';
import deckRouter from './routes/deckRoute';
import { unknownEndpoint } from './utils/middleware';
import globalErrorHandler from './controllers/errorController';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message);
  });

app.use('/api/user', userRouter);
app.use('/api/deck', deckRouter);

app.use(unknownEndpoint);

app.use(globalErrorHandler);

app.listen(config.PORT, () => {
  console.log('App listening on port: ', config.PORT);
});
