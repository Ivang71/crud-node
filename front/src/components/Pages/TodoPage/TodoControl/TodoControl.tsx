import { useState } from 'react'
import { observer } from 'mobx-react'
import { Add } from '@mui/icons-material'
import { Button, TextareaAutosize } from '@mui/material'
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
      <TextareaAutosize
        value={newTodoText}
        onChange={({ target: { value } }) => setNewTodoText(value)}
        onKeyDown={(e) => {
          e.key === 'Enter' && onAddTodoClick()
        }}
        minRows={2}
        spellCheck={false}
        color="primary"
      />
      <Button
        onClick={onAddTodoClick}
        variant="contained"
        size="large"
        endIcon={<Add/>}
      >
        Add
      </Button>
    </div>
  )
})
