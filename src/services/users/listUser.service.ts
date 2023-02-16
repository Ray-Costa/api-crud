import { IUserResult,IUserWithOutPassword } from '../../interfaces/users.interfaces';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';
import { response } from 'express';
import { AppError } from '../../errors';



export const listUserService = async (idUser:number):Promise<IUserWithOutPassword> => {

  const queryString: string = `
      SELECT *
      FROM users
      WHERE id = $1;
  `
  const queryConfig:QueryConfig = {
    text: queryString,
    values: [idUser]
  }

  const queryResult:QueryResult = await client.query(queryConfig)

  return queryResult.rows[0]


}








