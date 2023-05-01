import User, {IUserDocument, IUser} from "../models/user";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

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
        password,
        decks: []
    });

    
    await user.save();

    const loggedInUser: IUserDocument | null = await User.findOne({username})

    if(!loggedInUser)
    {
        return res.status(500).json({erorr: 'Something went wrong'})
    }


    return createJsonWebToken(loggedInUser, 201, res);
}


async function login(req: Request, res: Response)
{
    const {username, password} = req.body;

    if(!username || !password)
    {
        return res.status(400).json('Missing credinitals')
    }

    const user = (await User.findOne({username}).select('+password')) as IUserDocument | null


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