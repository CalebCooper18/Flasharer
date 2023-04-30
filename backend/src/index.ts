import express from 'express';
import config from './utils/config';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute';
import middleware from './utils/middleware';

const app = express();

app.use(express.json());

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.error('error connecting to MongoDB:', error.message)
	})


app.use('/api/user', userRouter);

app.use(middleware.unknownEndpoint);

app.listen(config.PORT, () => {
    console.log('App listening on port: ', config.PORT);
})