import { json } from 'body-parser'
import express from 'express'
import { Todo } from './models/Todo'


export const todosRouter = express.Router()

todosRouter.use(json())

todosRouter.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ updatedAt: -1 }).lean()
  res.send(todos)
})

todosRouter.post('/', async (req, res) => {
  const todo = new Todo({ text: req.body.text })
  todo.save((err, todo) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.send(todo)
  })
})

todosRouter.put('/:id', async (req, res) => {
  await Todo.updateOne(
    { _id: req.params.id },
    { text: req.body.text },
    {},
    (err) => res.sendStatus(err ? 500 : 200)
  )
})

todosRouter.delete('/:id', async (req, res) => {
  await Todo.findOneAndDelete(
    { id: req.params.id },
    {},
    (err) => res.sendStatus( err ? 500 : 200 )
  )
  res.sendStatus(200)
})
