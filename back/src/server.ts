import express from 'express';
import cors from 'cors';
import { urlencoded } from 'body-parser';
import { MongoClient } from 'mongodb'
import { routes } from './app/routes'

export const app = express()

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: false }));

const serverPort = 4000
const uri = 'mongodb+srv://user0:awesomeTodos@cluster0.qjrp4.mongodb.net/todos-app?retryWrites=true&w=majority'
MongoClient.connect(uri, (err, database) => {
  if (err) {
    return console.error(err)
  }
  if (!database) {
    return console.error('database is undefined')
  }
  const db = database.db('todos-app')
  routes(app, db)
  const server = app.listen(serverPort, () => console.log(`Server is listening at port ${serverPort}`))

  process.on('SIGINT', async () => {
    await server.close(() => console.log('Server stopped'))
    process.exit()
  });
})
