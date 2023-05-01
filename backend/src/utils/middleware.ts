import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';


export function unknownEndpoint(_req: Request, res: Response)
{
    return res.status(404).json({error: 'This endpoint does not exist'});
}
 
export async function authToken(req: Request, res: Response, next: NextFunction)
{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token)
    {
        return res.status(401).json({error: 'Missing token'})
    }
    try {
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        if(typeof decodedToken === 'string')
        {
            throw new Error();
        }
        const user = await User.findById(decodedToken.id);
        req.body.user = user;

        return next();
    } catch (error) {
    
        return res.status(403).json({error: 'Unauthorized access'});
        
    }
    
}

