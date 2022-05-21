export interface Todo {
  id: number
  text: string
  createdAt: Date
  completed: boolean
  position: number
}

export type TodoData = Omit<Todo, 'id' | 'createdAt'>

export type TodoDto = Partial<TodoData>
