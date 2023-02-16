import { z } from 'zod'

export const createUserSchemas = z.object({
  name:z.string(),
  email:z.string().email(),
  password:z.string(),
  admin:z.boolean(),
  active:z.boolean()
})
