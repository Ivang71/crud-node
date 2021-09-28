import { createTheme } from '@mui/material'
import { indigo, teal } from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: teal[300],
      main: teal[500],
      dark: teal[700],
    },
    secondary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[700],
    },
  },
})
