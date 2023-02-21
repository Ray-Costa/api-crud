import { Response, Request, NextFunction } from 'express';
import { AppError } from '../errors';
import jwt from 'jsonwebtoken';

export const ensureValidTokenMiddlewares = async (request:Request,response:Response,next:NextFunction):Promise<void> => {

  let token = request.headers.authorization

  if(!token){
    throw  new AppError('Missing Bearer Token', 401)
  }

  token = token.split(' ')[1]
  jwt.verify(token,process.env.SECRET_KEY || 'w1Z6S5x3Jqel4Y6dieRJ0lQAefGWQk39', (error, decoded:any) => {
    if(error){
      throw new AppError(error.message, 401)
    }
    return next()

  })



}
