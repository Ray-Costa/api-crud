import { Request, Response } from 'express';
import { createUsersService } from '../services/users/createUsers.service';
import { IUserRequest } from '../interfaces/users.interfaces';
import { listUserService } from '../services/users/listUser.service';

export const createUsersController = async (request: Request, response: Response): Promise<Response> => {


  const userData: IUserRequest = request.body

  const newUser = await createUsersService(userData)

  return response.status(201).json(newUser)


}
export const listUserController = async (request: Request, response: Response): Promise<Response> => {


  const idUser: number = parseInt(request.params.id)

  const getUser = await listUserService(idUser)

  return response.json(getUser)

}
