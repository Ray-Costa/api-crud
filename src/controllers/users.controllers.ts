import { request, Request, Response } from 'express';
import { createUsersService } from '../services/users/createUsers.service';
import { IUser, IUserRequest } from '../interfaces/users.interfaces';
import { deleteUserService,} from '../services/users/deleteUser.service';
import { listAllUserService } from '../services/users/listAllUser.service';
import { updateUserService } from '../services/users/updateUser.service';
import { updateUserRecoveryService } from '../services/users/updateUserRecovery.service';
import { listAllUserLoggedService } from '../services/users/listAllUserLogged.service';

export const createUsersController = async (request: Request, response: Response): Promise<Response> => {


  const userData: IUserRequest = request.body

  const newUser = await createUsersService(userData)

  return response.status(201).json(newUser)


}
export const deleteUserController = async (request: Request, response: Response): Promise<Response> => {


  const idUser: number = parseInt(request.params.id)

  await deleteUserService(idUser)

  return response.status(204).send()

}
export const listAllUserController = async (request:Request, response:Response): Promise<Response> => {

  const getAllUser = await listAllUserService()

  return response.json(getAllUser)
}

export const updateUserController = async (request:Request, response:Response): Promise<Response> => {

  const userData: IUserRequest = request.body

  const idUser: number = parseInt(request.params.id)

  const newUser: IUser = request.body

  const updateUser = await updateUserService(idUser, newUser,userData);

  return  response.status(200).json(updateUser)
}

export const updateUserRecoveryController = async (request:Request, response: Response): Promise<Response> => {

  const idUser: number = parseInt(request.params.id)

  const newUser: IUser = request.body

  const updateUserRecovery = await updateUserRecoveryService(idUser,newUser);

  return response.status(200).json(updateUserRecovery)


}
export const listAllUserLoggedController = async (request:Request, response:Response): Promise<Response> => {

  const getAllUserLogged = await listAllUserLoggedService()

  return response.json(getAllUserLogged)
}

