import { useState } from 'react';
import { observer } from 'mobx-react';
import { todosStore } from '../../stores/todosStore'
import './App.scss';

export const App = observer(() => {
  const [newTodoText, setNewTodoText] = useState<string>('');

  const onAddTodoClick = () => {
    todosStore.add(newTodoText);
    setNewTodoText('');
  };

  return (
    <main>
      <div>
        <input
          value={newTodoText}
          onChange={({ target: { value } }) => setNewTodoText(value)}
        />
        <button onClick={onAddTodoClick}>
          Add
        </button>
      </div>
      {todosStore.todos.map(({_id, text}) => (
        <div key={_id}>{text}</div>
      ))}
    </main>
  );
})
