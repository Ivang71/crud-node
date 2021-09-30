import { useState } from 'react'
import { observer } from 'mobx-react'
import { Add } from '@mui/icons-material'
import { Button, TextareaAutosize, TextField } from '@mui/material'
import { todosStore } from '../../../../stores/todosStore'
import './TodoControl.scss'


export const TodoControl = observer(() => {
  const [newTodoText, setNewTodoText] = useState<string>('')

  const onAddTodoClick = () => {
    if (newTodoText) {
      todosStore.add(newTodoText)
      setNewTodoText('')
    }
  }

  return (
    <div className="todo-control">
      <TextField
        value={newTodoText}
        onChange={({ target: { value } }) => setNewTodoText(value)}
        onKeyDown={(e) => {
          e.key === 'Enter' && onAddTodoClick()
        }}
        spellCheck={false}
        className="input"
        placeholder="Enter something..."
        color="primary"
      />
      <Button
        onClick={onAddTodoClick}
        variant="contained"
        endIcon={<Add/>}
      >
        Add
      </Button>
    </div>
  )
})
