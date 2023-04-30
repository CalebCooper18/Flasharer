import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { Types } from "mongoose";

interface NewUser
{
   name: string,
   username: string,
   cards: Types.ObjectId[],
   id?: string
}


function signToken(id: string)
{
    return jwt.sign({ id }, process.env.JWT_SECRET as string,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}


function createJsonWebToken(user: NewUser, statusCode: number, res: Response)
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


async function signUp(req: Request, res: Response)
{
    const {name, username, password} = req.body;

    if(!name || !username || !password)
    {
        return res.status(400).send('Missing credinitals');
    }

    let user = await User.findOne({username});

    if(user)
    {
        return res.status(400).json({error: 'This username as already been taken please use another'});
    }


    user = new User({
        name,
        username,
        password
    });

    const newUser = await user.save();


    return createJsonWebToken(newUser, 201, res);
}


async function login(_req: Request, _res: Response)
{
 
}



export default {
    signUp,
    login
}