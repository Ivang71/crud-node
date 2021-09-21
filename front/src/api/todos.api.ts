import { http } from './http';
import { Todo } from '../Types/CommonTypes';

export const todosApi = {
  get() {
    return http.get<Todo[]>('todos');
  },
  
  add(text: string) {
    return http.post('todos', { text });
  }
}
