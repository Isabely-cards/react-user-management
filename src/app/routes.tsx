import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import UserList from '../features/users/pages/UserList'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { darkTheme, lightTheme } from '../theme/theme'
import { Sidebar } from './layout/Sidebar'

export function AppRoutes() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const theme = darkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box display="flex">
          <Sidebar />
          <Box component="main" flexGrow={1} p={3}>
            <Routes>
              <Route path="/" element={<UserList />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}
