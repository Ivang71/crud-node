import { observer } from 'mobx-react'
import { Edit } from '@mui/icons-material'
import { Collapse, Container, IconButton, List, Paper, Tooltip, Typography } from '@mui/material'
import { TransitionGroup } from 'react-transition-group'
import { todosStore } from '../../../../stores/todosStore'
import './TodoList.scss'

export const TodoList = observer(() => {
  return (
    <List>
      <TransitionGroup className="list">
        {todosStore.todos.map(({ _id, text, editable }) => (
          <Collapse>
            <Container
              key={_id}
              className="item-container"
            >
              {editable ?
                <input
                  value={text}
                  onChange={({ target: { value } }) => text = value}
                  spellCheck={false}
                />
                :
                <Paper
                  elevation={4}
                  className="item"
                >
                  <Typography>{text}</Typography>
                  <Tooltip
                    title="Edit"
                    contentEditable={editable}
                  >
                    <IconButton onClick={() => editable = !editable}>
                      <Edit sx={{ fontSize: 20 }}/>
                    </IconButton>
                  </Tooltip>
                </Paper>}
            </Container>
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  )
})
