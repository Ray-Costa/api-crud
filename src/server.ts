import { app } from './app';
import { connectDatabase } from './database';

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;

app.listen(PORT, async () => {
  await connectDatabase()
  console.log(runningMsg)

})
