import { Router } from 'express';
import { createLoginCrontroller } from '../controllers/login.controllers';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { createLoginSchemas } from '../schemas/login.schemas';

export const loginRoutes: Router = Router()

loginRoutes.post('',ensureDataIsValidMiddleware(createLoginSchemas),createLoginCrontroller)

