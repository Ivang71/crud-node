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
  const newTodo = await Todo.findOneAndUpdate(
    { _id: req.body._id },
    { text: req.body.text },
    { new: true },
  )
  console.log('insertedData', newTodo)
  res.send(newTodo)
})

todosRouter.delete('/:id', async (req, res) => {
  Todo.findOneAndDelete({ id: req.params.id })
  res.sendStatus(200)
})
