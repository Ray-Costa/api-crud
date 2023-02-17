import {Router} from 'express';
import { createUsersController, listUserController } from '../controllers/users.controllers';
import { ensureUserExistsMiddleware } from '../middlewares/ensureUserExists.middlewares';
export const usersRoutes:Router = Router()
import { createUserSchemas } from '../schemas/users.schemas';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';

usersRoutes.post('',ensureDataIsValidMiddleware(createUserSchemas),createUsersController)
usersRoutes.get('/:id',ensureUserExistsMiddleware,listUserController)
