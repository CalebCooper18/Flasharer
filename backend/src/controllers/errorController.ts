import {Request, Response, NextFunction} from "express";
import { MongoError } from "mongodb";
import AppError from "../utils/appError";
import mongoose from "mongoose";


function handleValidationError(err: mongoose.Error.ValidationError , res: Response)
{
    const errors = Object.values(err.errors).map((el) => el.message)
    const errorMessage = errors.join(', ');
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
        return 'code' in err;
    }
    return false
}

function isMongooseError(err: unknown): err is mongoose.Error 
{
    return err instanceof mongoose.Error;
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
        if (err.code === 11000) handleDuplicationError(err, res);
    }
    else if (isMongooseError(err))
    {
        if (err instanceof mongoose.Error.ValidationError) handleValidationError(err, res);
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