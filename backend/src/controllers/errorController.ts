import {Request, Response, NextFunction, response } from "express";
import { MongoError } from "mongodb";
import AppError from "../utils/appError";


function handleValidationError(err: MongoError, res: Response)
{
    let errorMessage = '' 
    if('errors' in err && err.errors && typeof err.errors === 'object')
    {
        const errors = Object.values(err.errors).map((el: any) => el.message)
        errorMessage = errors.join(', ');
    }
    else 
    {
        errorMessage = 'Internal Server Error!';
    }
    
    const newAppError = new AppError(errorMessage, 400);
    sendError(newAppError, res);
}

function handleDuplicationError(err: MongoError, res: Response)
{
    let errorMessage = ''
    if('keyValue' in err && typeof err.keyValue === 'object' && err.keyValue && 'username' in err.keyValue)
    {  
       const { username } = err.keyValue
       errorMessage = `This username ${username} has already been taken please try another`;
    }
    else 
    {
        errorMessage = 'Internal Server Error!';
    }
    const newAppError = new AppError(errorMessage, 400);
    sendError(newAppError, res);
}


function isMongoError(err: unknown): err is MongoError 
{
    if(err && typeof err === 'object')
    {
        return ('name' in err && err.name === 'ValidationError') || 'code' in err;
    }
    return false
}




function sendError(err: AppError, res: Response)
{
    return res.status(err.statusCode).json({
        status: err.status,
        error: err.message
    });
}



function handleAllErrors(err: unknown, _req: Request, res: Response, _next: NextFunction)
{

    if(isMongoError(err))
    {
        if (err.name === 'ValidationError') handleValidationError(err, res);
        if (err.code === 11000) handleDuplicationError(err, res);
    }
    else if (err instanceof AppError)
    {

        sendError(err, res);
    }
    else if (err instanceof Error)
    {

        const newError = new AppError(err.message, 500)
        sendError(newError, res);
    }
}


export default handleAllErrors;