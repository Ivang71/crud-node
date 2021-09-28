import axios from 'axios';
import { PostResponse, Todo } from '../types/CommonTypes'

const api = axios.create({
  baseURL: "http://localhost:4000/"
});

export const todosApi = {
  async get() {
    const r = await api.get<Todo[]>('todos')
    return r.data
  },

  async add(text: string) {
    const r = await api.post<PostResponse>('todos', { text })
    return r.data
  },

  async change({ _id, text }: Todo) {
    const r = await api.put('todos', { _id, text })
    return r.data
  },

  async delete(_id: string) {
    const r = await api.delete('todos', { data: _id })
    return r.data
  },
}
