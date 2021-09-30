import { useState } from 'react'
import { observer } from 'mobx-react'
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Button, Container, IconButton, Link, SwipeableDrawer, Theme, Typography } from '@mui/material'
import { darkTheme } from '../../utils/themes/darkTheme'
import './Drawer.scss'

interface DrawerProps {
  theme: Theme,
  toggleTheme: Function,
}

export const Drawer = observer(({
  theme,
  toggleTheme,
}: DrawerProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const darkThemeIsOn = theme === darkTheme

  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        className="open-menu-button"
      >
        <MenuIcon/>
      </IconButton>
      <SwipeableDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Container className="drawer-container">

          <div className="item">
            <Button
              onClick={() => toggleTheme()}
              variant="outlined"
              endIcon={darkThemeIsOn ? <LightModeIcon/> : <DarkModeIcon/>}
            >
              Switch theme
            </Button>
          </div>

          <div className="bottom">
            <div className="item">
              <Typography>
                Source code can be found {' '}
                <Link
                  href="https://github.com/Ivang71/mern-app"
                  target="_blank"
                >
                  here
                </Link>
              </Typography>
            </div>
          </div>
        </Container>
      </SwipeableDrawer>
    </>
  )
})
