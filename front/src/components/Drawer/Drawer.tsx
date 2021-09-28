import { useState } from 'react'
import { observer } from 'mobx-react'
import MenuIcon from '@mui/icons-material/Menu';
import { Container, IconButton, Paper, SwipeableDrawer } from '@mui/material'
import './Drawer.scss'

interface DrawerProps {
  toggleTheme: Function,
}

export const Drawer = observer(({
  toggleTheme,
}: DrawerProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        className="menu-button"
      >
        <MenuIcon/>
      </IconButton>
      <SwipeableDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Container className="drawer-container">
          <IconButton
            onClick={() => setOpen(!open)}
            className="menu-button"
          >
            <MenuIcon/>
          </IconButton>
        </Container>
      </SwipeableDrawer>
    </>
  )
})
