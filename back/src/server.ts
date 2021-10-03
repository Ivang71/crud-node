import express from 'express'
import mongoose from 'mongoose'
import { json } from 'body-parser'
import { todosRouter } from './routes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_URI || '', {  }, (err) => {
  if (err) {
    console.error(err)
  }
})

mongoose.connection.on('error', (err) => {
  console.error('Error ', err)
})

app.use(json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/todos', todosRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})



/*
import express from 'express'
import cors from 'cors'
import { urlencoded } from 'body-parser'
import { connect } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
export const app = express()

app.use(express.json())
app.use(cors())
app.use(urlencoded({ extended: false }))

connect(process.env.DB_URI as string, {  }, (err) => {
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
  })
})
*/
