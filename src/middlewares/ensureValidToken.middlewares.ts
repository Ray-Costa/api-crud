import { Response, Request, NextFunction } from 'express';
import { AppError } from '../errors';
import jwt from 'jsonwebtoken';

export const ensureValidTokenMiddlewares = async (request:Request,response:Response,next:NextFunction):Promise<void> => {

  let token = request.headers.authorization

  if(!token){
    throw  new AppError('Missing Bearer Token', 401)
  }

  token = token.split(' ')[1]
  jwt.verify(token,'CHAVE SECRETA', (error, decoded:any) => {
    if(error){
      throw new AppError(error.message, 401)
    }
    return next()

  })



}
