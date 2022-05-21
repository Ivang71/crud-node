import { api } from 'api/api'
import { Todo, TodoData, TodoDto } from 'types/CommonTypes'


export const todosApi = {
  async get() {
    const r = await api.get<Todo[]>('todos')
    return r.data
  },

  async post({ text, position, completed }: TodoData) {
    const r = await api.post<Todo>('todos', { text, position, completed })
    return r.data
  },

  put(id: Todo["id"], todoDto: TodoDto) {
    api.put(`todos/${id}`, todoDto)
  },

  delete(ids: number[]) {
    api.delete(`todos`, { data: { ids } })
  },
}
