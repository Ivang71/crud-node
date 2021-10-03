import { api } from 'api/api'
import { Todo } from 'types/CommonTypes'

export const todosApi = {
  async get() {
    const r = await api.get<Todo[]>('todos')
    return r.data
  },

  async post(text: string) {
    const r = await api.post<Todo>('todos', { text })
    return r.data
  },

  async put({ _id, text }: Todo) {
    const r = await api.put(`todos/${_id}`, { text })
    console.log('put data', r)
    return r.data
  },

  delete(_id: string) {
    api.delete(`todos/${_id}`)
  },
}
