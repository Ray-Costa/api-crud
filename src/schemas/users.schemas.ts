import { z } from 'zod'

export const createUserSchemas = z.object({
  name:z.string(),
  email:z.string().email(),
  password:z.string(),
  admin:z.boolean(),
  active:z.boolean()
})

export const returnUserSchemas = createUserSchemas.extend({id: z.number()})

export  const returnUserSchemasWithoutPassword = returnUserSchemas.omit({password: true})
