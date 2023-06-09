import { ILoginRequest } from '../../interfaces/login.interfaces';
import { QueryConfig } from 'pg';
import { client } from '../../database';
import { AppError } from '../../errors';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { IUserResultWithPassword } from '../../interfaces/users.interfaces';


export const createLoginService = async (loginData: ILoginRequest): Promise<string> => {

  const queryString: string = `
      SELECT *
      FROM users
      WHERE email = $1

  `
  const queryConfi: QueryConfig = {
    text: queryString,
    values: [loginData.email]

  }
  const queryResult: IUserResultWithPassword = await client.query(queryConfi)

  if (queryResult.rowCount === 0) {
    throw new AppError('Wrong email/password', 401)

  }
  const matchPassword: boolean = await compare(loginData.password, queryResult.rows[0].password)

  if (!matchPassword) {
    throw new AppError('Wrong email/password', 401)

  }
  const token: string = jwt.sign(
    {
      role: queryResult.rows[0].admin ? 'admin' : 'user'
    },
    process.env.SECRET_KEY || 'w1Z6S5x3Jqel4Y6dieRJ0lQAefGWQk39',
    {
      expiresIn: '24h',
      subject: queryResult.rows[0].id.toString()
    }
  )
  return token
}
