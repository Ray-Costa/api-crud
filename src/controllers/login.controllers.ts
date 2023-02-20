import { Request, request, Response } from 'express';
import { createLoginService } from '../services/login/createLogin.service';


export const createLoginCrontroller = async (request:Request, response:Response):Promise<Response> => {


   const token = await  createLoginService(request.body)

   return response.json({token: token})
}
