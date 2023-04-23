import express, { Express } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import requestRouter from './routes/request.router'
import userGiverRouter from './routes/user.giver.router'
import authenticationRouter from './routes/authentication.router'
import { connectDb, disconnectDB, loadEnv } from './database'

loadEnv();
 
const app = express()
app.use(cors())
app.use(express.json())
app.use(requestRouter)
app.use(userGiverRouter)
app.use(authenticationRouter)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
