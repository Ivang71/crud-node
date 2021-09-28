import { observer } from 'mobx-react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Drawer } from '../Drawer/Drawer'
import { useTheme } from '../../utils/themes/useTheme'
import { TodoPage } from '../Pages'
import './App.scss'


export const App = observer(() => {
  const [theme, toggleTheme] = useTheme()

  return (
    <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <Drawer toggleTheme={toggleTheme}/>
        <div
          style={{
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
          }}
        >
          <TodoPage/>
        </div>
      </ThemeProvider>
    </>
  )
})
