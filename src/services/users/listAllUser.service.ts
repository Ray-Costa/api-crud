import { IAllUserReturn } from '../../interfaces/users.interfaces';
import { QueryConfig, QueryResult } from 'pg';
import { client } from '../../database';

export const listAllUserService = async ():Promise<IAllUserReturn> => {

  const queryString: string =`
      SELECT * FROM users

  `
  const { rows }:QueryResult = await client.query(queryString)

  return rows



}
