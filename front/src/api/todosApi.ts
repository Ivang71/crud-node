import axios from 'axios';
import { Todo } from '../Types/CommonTypes';

const api = axios.create({
  baseURL: "http://localhost:4000/"
});

export const todosApi = {
  get() {
    return api.get<Todo[]>('todos');
  },

  add(text: string) {
    return api.post('todos', { text });
  }
}
