import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


function unknownEndpoint(_req: Request, res: Response)
{
    return res.status(404).json({error: 'This endpoint does not exist'});
}








export default {
    unknownEndpoint
}