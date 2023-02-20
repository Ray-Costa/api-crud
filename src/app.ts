import 'express-async-errors'
import express,{Application} from 'express';
import { usersRoutes } from './routes/users.routes';
import { handleErrors } from './errors';
import { loginRoutes } from './routes/login.routes';

export const app:Application = express()
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/login', loginRoutes)

app.use(handleErrors)
