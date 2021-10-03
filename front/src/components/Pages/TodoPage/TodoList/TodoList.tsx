import { Collapse, List } from '@mui/material'
import { observer } from 'mobx-react'
import { TransitionGroup } from 'react-transition-group'
import { todosStore } from 'stores/todosStore'
import { TodoItem } from './TodoItem/TodoItem'
import './TodoList.scss'


export const TodoList = observer(() => {
  console.log('%c todos', 'color: green', todosStore.todos)
  return (
    <List>
      <TransitionGroup className="list">
        {todosStore.todos.map((todo) => (
          <Collapse key={todo._id}>
            <TodoItem todo={todo}/>
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  )
})
