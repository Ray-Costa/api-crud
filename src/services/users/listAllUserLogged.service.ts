import { IAllUserReturn } from '../../interfaces/users.interfaces';
import {  QueryResult } from 'pg';
import { client } from '../../database';

export const listAllUserLoggedService = async ():Promise<IAllUserReturn> => {

  const queryString: string =`
      SELECT * FROM users

  `
  const { rows }:QueryResult = await client.query(queryString)

  return rows



}
