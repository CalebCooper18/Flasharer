import { IUserDocument, IUser } from "../models/user";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { createUser, loginUser } from "../service/user.service";

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
        token,
        data: {
            user
        }
        
    })
}


async function registerHandler(req: Request, res: Response)
{

    try 
    {
        const user = await createUser(req.body as IUser)
        return createJsonWebToken(user, 201, res);
    } catch(e: any) {
        return res.status(409).send(e.message)
    }
}


async function loginHandler(req: Request, res: Response)
{
    console.log(req.body);
    const user = await loginUser(req.body);

    if(!user)
    {
        return res.status(401).json('Invalid username or password');
    }

    return createJsonWebToken(user, 200, res);
 
}



export default {
    registerHandler,
    loginHandler
}