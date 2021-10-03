import { Schema, model } from 'mongoose'

interface Todo {
  text: string,
}

const TodoSchema = new Schema<Todo>({
  text: { type: String, required: true }
}, { timestamps: true })

export const Todo = model<Todo>('Todo', TodoSchema)
