import { DeleteOutline } from '@mui/icons-material'
import { Container, IconButton, Input, InputProps, Paper, styled, Tooltip } from '@mui/material'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { KeyboardEvent, RefObject, useEffect, useRef, useState } from 'react'
import { todosStore } from 'stores/todosStore'
import { Todo } from 'types/CommonTypes'
import { isTouchscreen } from '../../../../../utils/commonUtils'
import './TodoItem.scss'

const onClickOutside = (
  ref: RefObject<any>,
  cb: (e?: Event) => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        cb(event)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])
}

const TodoInput = styled(Input)<InputProps>(({ theme }) => (
  {
    '::after, ::before': {
      content: 'none',
    },
  }
))

interface TodoItemProps {
  todo: Todo,
}

export const TodoItem = observer(({
  todo,
}: TodoItemProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [hover, setHover] = useState<boolean>(false)
  const [text, setText] = useState<string>(todo.text)

  const save = () => {
    if (text !== todo.text) {
      todosStore.change(todo.id, { text: text })
    }
    setActive(false)
  }

  const handleItemClick = () => {
    inputRef.current?.focus()
    setActive(true)
  }

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  onClickOutside(itemRef, save)

  return (
    <Container className="item-container">
      <Paper
        ref={itemRef}
        elevation={4}
        className={classNames('item', { active })}
        onClick={handleItemClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <TodoInput
          inputRef={inputRef}
          onFocus={(e: any) => e.target.select()}
          onBlur={save}
          value={text}
          onChange={(e: any) => setText(e.target.value)}
          onKeyDown={onEnter}
          spellCheck={false}
          fullWidth
          multiline
          placeholder="Todo"
        />
        <Tooltip title="Delete">
          <IconButton
            onClick={() => todosStore.delete([todo.id])}
            className="delete-button"
            style={{
              opacity: (isTouchscreen || hover) ? 1 : 0,
            }}
          >
            <DeleteOutline/>
          </IconButton>
        </Tooltip>
      </Paper>
    </Container>
  )
})
