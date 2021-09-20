import { useEffect, useState } from 'react';
import { Todo } from '../../Types/CommonTypes';
import './App.css';

const baseUrl = 'http://localhost:4000';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');

  const getTodos = () => fetch(`${baseUrl}/todos`).then(res => res.json()).then(data => setTodos(data));

  const addTodo = (text: string) => {
    fetch(`${baseUrl}/todos`,
      {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(res => res.json()).then(({ insertedId }) => setTodos([...todos, { _id: insertedId, text }]));
  };

  const onAddTodoClick = (text: string) => {
    setNewTodoText('');
    addTodo(text);
  };

  useEffect(() => {
    getTodos();
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
