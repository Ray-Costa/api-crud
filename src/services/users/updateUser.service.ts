import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { IUser, IUserRequest } from '../../interfaces/users.interfaces';
import { request, Response } from 'express';
import { AppError } from '../../errors';


export const updateUserService = async (idUser: number, newUser: IUser,userData:IUserRequest): Promise<Response | void> => {

  const stringUserExists: string = `
      SELECT *
      FROM users
      WHERE email = $1;
  `
  const queryConfigUserExists: QueryConfig = {
    text: stringUserExists,
    values: [userData.email]
  }
  const queryResultUserExists: QueryResult = await client.query(queryConfigUserExists)

  if (queryResultUserExists.rowCount > 0) {
    throw new AppError('E-mail already registered', 409)
  }

  // language=SQL format=false
  const getUserQuery: string = `
      SELECT * FROM users WHERE id = $1   
  `
  const userResponse = await client.query(getUserQuery, [idUser]);

  const user = userResponse.rows[0];

  const valuesUser: IUserRequest = { ...user, ...newUser };

  const queryString: string = `
      UPDATE users
      SET name     = $1,
          email = $2,
          password = $3
      WHERE id = $4 RETURNING *;

  `
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [valuesUser.name,valuesUser.email,valuesUser.password, idUser]
  }
  const queryResult = await client.query(queryConfig)

  return queryResult.rows[0]
}
