import { IUserDocument, IUser } from "../models/user";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { createUser, loginUser } from "../service/user.service";
import AppError from "../utils/appError";

function signToken(id: string)
{
    return jwt.sign({ id }, process.env.JWT_SECRET as string,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


function createJsonWebToken(user: IUserDocument, statusCode: number, res: Response)
{
    const token = signToken(user.id as string);
    
    return res.status(statusCode).json({
        status: 'Success',
        data: {
            id: user.id,
            name: user.name,
            username: user.username,
            token
        }
        
    })
}


async function registerHandler(req: Request, res: Response, next: NextFunction)
{

    try 
    {
        if(!req.body.password || !req.body.name || !req.body.username)
        {
            return next(new AppError('Missing Credinitals', 400))
        }
        const user = await createUser(req.body as IUser)
        return createJsonWebToken(user, 201, res);
    } catch(e: unknown) {
        return next(e)
    }
}


async function loginHandler(req: Request, res: Response, next: NextFunction)
{
    try {
        const user = await loginUser(req.body);

        if(!user)
        {
            return next(new AppError('Invalid Username or Password', 403));
        }

        return createJsonWebToken(user, 200, res);

    } catch(e: unknown) {
        return next(e)
    }
 
}



export default {
    registerHandler,
    loginHandler
}