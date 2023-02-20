import { z } from 'zod';
import { createLoginSchemas } from '../schemas/login.schemas';


export type ILoginRequest = z.infer<typeof createLoginSchemas>
