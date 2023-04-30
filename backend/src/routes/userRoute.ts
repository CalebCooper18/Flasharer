import { Router } from "express";
import authController from '../controllers/authController';

const userRouter = Router()

userRouter.post('/signup', authController.signUp);
userRouter.post('/login', authController.login);







export default userRouter;