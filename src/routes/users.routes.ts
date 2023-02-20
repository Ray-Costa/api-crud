import {Router} from 'express';
import {
  createUsersController,
  deleteUserController,
  listAllUserController,
  updateUserController
} from '../controllers/users.controllers';
import { ensureUserExistsMiddleware } from '../middlewares/ensureUserExists.middlewares';

export const usersRoutes:Router = Router()
import { createUserSchemas } from '../schemas/users.schemas';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { ensureValidTokenMiddlewares } from '../middlewares/ensureValidToken.middlewares';


usersRoutes.post('',ensureDataIsValidMiddleware(createUserSchemas),createUsersController)
usersRoutes.get('',ensureValidTokenMiddlewares,listAllUserController)
usersRoutes.delete('/:id',ensureUserExistsMiddleware,ensureValidTokenMiddlewares,deleteUserController)
usersRoutes.patch('/:id',ensureValidTokenMiddlewares, updateUserController)
