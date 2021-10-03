import { RefObject, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import { DeleteOutline } from '@mui/icons-material'
import { Container, IconButton, Input, InputProps, Paper, styled, Tooltip } from '@mui/material'
import { todosStore } from 'stores/todosStore'
import './TodoItem.scss'
import { Todo } from 'types/CommonTypes'

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
    console.log(todo.text, ' ', active)
    if (active) {
      setActive(false)
      const o = {
        ...todo,
        text: '',
      }
    }
  }

  const selectText = () => {
    const range = new Range()
    inputRef.current && range.selectNodeContents(inputRef.current)
    document.getSelection()?.removeAllRanges()
    document.getSelection()?.addRange(range)
  }

  onClickOutside(itemRef, save)

  return (
    <Container
      className="item-container"
    >
      <Paper
        ref={itemRef}
        elevation={4}//textRef.current?.focus()
        className={classNames('item', { active })}
        onClick={() => setActive(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <TodoInput
          ref={inputRef}
          // onFocus={selectText}
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          placeholder="Todo"
        />
        <Tooltip title="Delete">
          <IconButton
            onClick={() => todosStore.delete(todo._id)}
            className="delete-button"
            style={{
              opacity: hover ? 1 : 0,
            }}
          >
            <DeleteOutline/>
          </IconButton>
        </Tooltip>
      </Paper>
    </Container>
  )
})
