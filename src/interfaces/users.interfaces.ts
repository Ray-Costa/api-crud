import { QueryResult } from 'pg';

export interface IUserRequest {
  name:string,
  email:string,
  password:string,
  admin:boolean,
  active:boolean
}

export interface IUser extends IUserRequest {
  id:number
}

export type IUserWithOutPassword = Omit<IUser, 'password'>

export type IUserResult = QueryResult<IUserWithOutPassword>
