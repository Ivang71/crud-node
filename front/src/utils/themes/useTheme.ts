import { Theme } from '@mui/material'
import { useState } from 'react'
import { darkTheme } from './darkTheme'
import { lightTheme } from './lightTheme'


export const useTheme = (): [Theme, () => void] => {
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
  const localTheme = localStorage.getItem('theme')
  if (!localTheme) {
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light')
  }
  const [theme, setTheme] = useState<Theme>(localTheme === 'dark' ? darkTheme : lightTheme)

  const toggleTheme = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme)
      localStorage.setItem('theme', 'light')
    } else {
      setTheme(darkTheme)
      localStorage.setItem('theme', 'dark')
    }
  }

  return [theme, toggleTheme]
}
