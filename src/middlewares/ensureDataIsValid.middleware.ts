import { NextFunction, Response,Request } from 'express';
import {ZodTypeAny} from 'zod'

export const ensureDataIsValidMiddleware = (schema:ZodTypeAny) => (request:Request, response:Response,next:NextFunction) => {

  const validateData = schema.parse(request.body)

  request.body = validateData

  return next()

}
