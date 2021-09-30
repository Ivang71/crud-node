import express from 'express';
import cors from 'cors';
import { urlencoded } from 'body-parser';
import { MongoClient } from 'mongodb'
import { routes } from './app/routes'
import dotenv from 'dotenv'

dotenv.config()
export const app = express()

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

MongoClient.connect(process.env.DB_URI as string, (err, database) => {
  if (err) {
    return console.error(err)
  }
  if (!database) {
    return console.error('database is undefined')
  }
  const db = database.db('todos-db')
  routes(app, db)
  const server = app.listen(process.env.PORT, () => console.log(`Server is listening at port ${process.env.PORT}`))

  process.on('SIGINT', async () => {
    await server.close(() => console.log('Server stopped'))
    process.exit()
  });
})
