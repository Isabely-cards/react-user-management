import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7b25eb',
    },
    secondary: {
      main: '#ab84dd',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b48fe4',
    },
    secondary: {
      main: '#86738a',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
})
