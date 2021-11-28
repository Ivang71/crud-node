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

app.listen(Number(process.env.PORT), process.env.HOSTNAME || 'localhost', () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
