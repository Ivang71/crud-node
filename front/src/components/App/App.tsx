import { Add, Edit } from '@mui/icons-material'
import { Button, CssBaseline, IconButton, List, TextField, ThemeProvider, Tooltip, Typography } from '@mui/material'
import { observer } from 'mobx-react'
import { Fragment, useState } from 'react'
import { todosStore } from '../../stores/todosStore'
import { useTheme } from '../../utils/themes/useTheme'
import './App.scss'


export const App = observer(() => {
  const [theme, toggleTheme] = useTheme()
  const [newTodoText, setNewTodoText] = useState<string>('')

  const onAddTodoClick = () => {
    if (newTodoText) {
      todosStore.add(newTodoText)
      setNewTodoText('')
    }
  }

  return (
    <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <main
          className="todo-page"
          style={{
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
            transition: theme.transitions.easing.easeInOut,
          }}
        >
          <div>
            <TextField
              value={newTodoText}
              onChange={({ target: { value } }) => setNewTodoText(value)}
              onKeyDown={(e) => {
                e.key === 'Enter' && onAddTodoClick()
              }}
              label="Todo"
              spellCheck={false}
              color="primary"
            />
            <Button
              onClick={onAddTodoClick}
              endIcon={<Add/>}
            >
              Add
            </Button>
            <Button onClick={toggleTheme}>
              Toggle theme
            </Button>
          </div>
          <List>
            {todosStore.todos.map(({ _id, text, editable }) => (
              <Fragment key={_id}>
                {editable ?
                  <input
                    value={text}
                    onChange={({ target: { value } }) => text = value}
                    spellCheck={false}
                  />
                  :
                  <div className="item">
                    <Typography>{text}</Typography>
                    <Tooltip
                      title="Edit"
                      contentEditable={editable}
                    >
                      <IconButton onClick={() => editable = !editable}>
                        <Edit sx={{ fontSize: 13 }}/>
                      </IconButton>
                    </Tooltip>
                  </div>}
              </Fragment>
            ))}
          </List>
        </main>
      </ThemeProvider>
    </>
  )
})
