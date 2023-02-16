import {Router} from 'express';
import { createUsersController, listUserController } from '../controllers/users.controllers';
import { ensureUserExistsMiddleware } from '../middlewares/ensureUserExists.middlewares';
export const usersRoutes:Router = Router()

usersRoutes.post('',createUsersController)
usersRoutes.get('/:id',ensureUserExistsMiddleware,listUserController)
