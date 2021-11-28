import { CssBaseline, ThemeProvider } from '@mui/material'
import { observer } from 'mobx-react'
import { useTheme } from '../../utils/themes/useTheme'
import { Drawer } from '../Drawer/Drawer'
import { TodoPage } from '../Pages'
import './App.scss'


export const App = observer(() => {
  const [theme, toggleTheme] = useTheme()

  return (
    <>
      <CssBaseline/>
      <ThemeProvider theme={theme}>
        <Drawer
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <div
          style={{
            color: theme.palette.text.primary,
            background: theme.palette.background.default,
          }}
          className="background-wrapper"
        >
          <TodoPage/>
        </div>
      </ThemeProvider>
    </>
  )
})
