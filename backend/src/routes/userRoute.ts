import { Router } from 'express';
import authController from '../controllers/authController';

const userRouter = Router();

userRouter.post('/signup', authController.registerHandler);
userRouter.post('/login', authController.loginHandler);

export default userRouter;
