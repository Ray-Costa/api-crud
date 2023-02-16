import { NextFunction, Request, Response } from 'express';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../database';
import { AppError } from '../errors';

 export const ensureUserExistsMiddleware = async (request:Request, response:Response, next:NextFunction): Promise<Response | void> => {
    const idUser: number = parseInt(request.params.id)

    const queryStringUserExists:string = `
    
      SELECT * FROM users WHERE id = $1;
    
    `
  const queryConfigUser: QueryConfig = {
      text: queryStringUserExists,
      values:[idUser]
  }
  const queryResult : QueryResult = await client.query(queryConfigUser)

  if(queryResult.rowCount === 0){
    throw new AppError('User not found', 404)

  }
  return next()
}
