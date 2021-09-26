import axios from 'axios';
import { PostResponse, Todo } from '../Types/CommonTypes'

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
  }
}
