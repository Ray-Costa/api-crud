
import { QueryConfig} from 'pg';
import { client } from '../../database';


export const deleteUserService = async (idUser:number):Promise<void> => {

  const queryString: string = `
      UPDATE users SET "active" = false WHERE id = $1;
      
  `
  const queryConfig:QueryConfig = {
    text: queryString,
    values: [idUser]
  }

  await client.query(queryConfig)

}








