import { useEffect, useState } from 'react';
import { Todo } from '../../Types/CommonTypes';
import './App.scss';
import { todosApi } from '../../api/todosApi';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');

  const addTodo = (text: string) => {
    todosApi.add(text).then(res => {
      const _id = res.data.insertedId;
      setTodos([...todos, { _id, text }]);
    });
  };

  const onAddTodoClick = (text: string) => {
    setNewTodoText('');
    addTodo(text);
  };

  useEffect(() => {
    todosApi.get().then(res => setTodos(res.data))
  }, []);

  return (
    <main>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button onClick={() => onAddTodoClick(newTodoText)}>
          Add
        </button>
      </div>
      {todos.map(({_id, text}) => (
        <div key={_id}>{text}</div>
      ))}
    </main>
  );
};
