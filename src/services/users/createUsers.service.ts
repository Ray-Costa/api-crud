import { IUserRequest, IUserResult, IUserWithOutPassword } from '../../interfaces/users.interfaces';
import { client } from '../../database';
import format from 'pg-format';
import { QueryConfig, QueryResult } from 'pg';
import { AppError } from '../../errors';
import { createUserSchemas } from '../../schemas/users.schemas';


export const createUsersService = async (userData:IUserRequest):Promise<IUserWithOutPassword> => {

  const validateUserData = createUserSchemas.parse(userData)

  const stringUserExists: string = `
      SELECT * FROM users WHERE email = $1;
  `
  const queryConfigUserExists: QueryConfig = {
    text:stringUserExists,
    values: [validateUserData.email]
  }
  const queryResultUserExists: QueryResult = await client.query(queryConfigUserExists)

  if(queryResultUserExists.rowCount > 0){
    throw new AppError('E-mail already registered',409)
  }

  const queryString:string = format(
    `
            INSERT INTO users(%I) VALUES (%L) RETURNING id, name, email,admin,active;
    
    `,
    Object.keys(validateUserData),
    Object.values(validateUserData)
  )

  const queryResult:IUserResult = await client.query(queryString)
  return queryResult.rows[0]

}
