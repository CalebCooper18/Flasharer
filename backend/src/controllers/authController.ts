import User from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { Types } from "mongoose";

interface NewUser
{
   name: string,
   username: string,
   decks: Types.ObjectId[],
   id?: string
}

interface CreatedUser {
    name: string,
    username: string,
    password: string,
    decks: Types.ObjectId[],
    comparePasswords: (password: string, password2: string) => Promise<boolean>;
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


async function login(req: Request, res: Response)
{
    const {username, password} = req.body;

    if(!username || !password)
    {
        return res.status(400).json('Missing credinitals')
    }

    const user = (await User.findOne({username}).select('+password')) as CreatedUser | null


    if(!user || !await user.comparePasswords(password, user.password))
    {
        return res.status(401).json('No account with that username')
    }

    return createJsonWebToken(user, 200, res);
 
}



export default {
    signUp,
    login
}