import { Router } from 'express';
import {
  createUsersController,
  deleteUserController,
  listAllUserController,
  listAllUserLoggedController,
  updateUserController,
  updateUserRecoveryController
} from '../controllers/users.controllers';
import { ensureUserExistsMiddleware } from '../middlewares/ensureUserExists.middlewares';
import { createUserSchemas } from '../schemas/users.schemas';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { ensureValidTokenMiddlewares } from '../middlewares/ensureValidToken.middlewares';
import { isAdmin } from '../middlewares/isAdmin.middleware';
import { isOwnerOrAdmin } from '../middlewares/isOwnerOrAdmin.middleware';

export const usersRoutes: Router = Router()


usersRoutes.post('', ensureDataIsValidMiddleware(createUserSchemas), createUsersController)
usersRoutes.get('', ensureValidTokenMiddlewares, isAdmin, listAllUserController)
usersRoutes.get('/profile', ensureValidTokenMiddlewares, listAllUserLoggedController)
usersRoutes.delete('/:id', ensureValidTokenMiddlewares, isOwnerOrAdmin, ensureUserExistsMiddleware, deleteUserController)
usersRoutes.patch('/:id', ensureDataIsValidMiddleware(createUserSchemas), ensureValidTokenMiddlewares, isOwnerOrAdmin, ensureUserExistsMiddleware, updateUserController)
usersRoutes.put('/:id/recover', ensureValidTokenMiddlewares, isAdmin, ensureUserExistsMiddleware, updateUserRecoveryController)
