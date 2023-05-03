import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUserDocument } from '../models/user';
import { findDeck } from '../service/deck.service';


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

export async function checkDeckOwnerShip(req: Request, res: Response, next: NextFunction)
{
    const user: IUserDocument = req.body.user;
    const id = req.params.id;

    const deckToCheckOwnerShip = await findDeck(id);

    if(!deckToCheckOwnerShip)
    {
        return res.status(404).json({error: 'Deck does not exist'});
    }

    if(deckToCheckOwnerShip.createdBy.toString() !== user._id.toString())
    {
        return res.status(403).json({error: 'User does not have access to this deck'});
    }

    req.body.deck = deckToCheckOwnerShip;

    return next();


}

