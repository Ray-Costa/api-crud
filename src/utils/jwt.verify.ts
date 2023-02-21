import jwt from 'jsonwebtoken'

export const isTokenValid = (token: string) => {
  const verify = jwt.verify(token, process.env.SECRET_KEY || 'w1Z6S5x3Jqel4Y6dieRJ0lQAefGWQk39', { complete: true });
  return verify;
}
