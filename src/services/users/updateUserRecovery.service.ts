import { QueryConfig } from 'pg';
import { client } from '../../database';
import { IUser } from '../../interfaces/users.interfaces';
import { AppError } from '../../errors';


export const updateUserRecoveryService = async (idUser: number, newUser: IUser): Promise<void> => {

  // language=SQL format=false
  const getUserQuery: string = `
      SELECT * FROM users WHERE id = $1                       
  `

  const { rows: getUser } = await client.query(getUserQuery, [idUser]);
  if (getUser[0].active) {
    throw new AppError('User already active', 400)
  }

  const queryString: string = `
      UPDATE users
      SET "active" = true
      WHERE id = $1 RETURNING *;
  `

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idUser]
  }

  const queryResult = await client.query(queryConfig)

  return queryResult.rows[0]

}
