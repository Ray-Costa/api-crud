import { QueryResult } from 'pg';
import { createUserSchemas,returnUserSchemas,returnUserSchemasWithoutPassword } from '../schemas/users.schemas';
import {z} from'zod'


export type IUserRequest = z.infer<typeof createUserSchemas>

export type IUser = z.infer<typeof returnUserSchemas>

export type IUserWithOutPassword = Omit<IUser, 'password'>

export type IUserResult = QueryResult<IUserWithOutPassword>
