import { observer } from 'mobx-react'
import { TodoControl } from './TodoControl/TodoControl'
import { TodoList } from './TodoList/TodoList'
import './TodoPage.scss'


export const TodoPage = observer(() => (
  <main className="todo-page">
    <TodoControl/>
    <TodoList/>
  </main>
))
