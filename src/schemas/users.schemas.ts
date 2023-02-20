import { z } from 'zod'
import { hashSync } from 'bcryptjs';

export const createUserSchemas = z.object({
  name:z.string(),
  email:z.string().email(),
  password:z.string().transform((pass)=>{
    return hashSync(pass,10)
  }),
  admin:z.boolean(),
  active:z.boolean()
})

export const returnUserSchemas = createUserSchemas.extend({id: z.number()})

export  const returnUserSchemasWithoutPassword = returnUserSchemas.omit({password: true})

export const allUsersSchema = z.array(returnUserSchemas)
