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
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              px: 2,
              ml: { md: '240px' },

              height: '100vh',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '1200px',
                height: '100%',
                overflow: 'auto',
                py: 4,
              }}
            >
              <Routes>
                <Route path="/" element={<UserList />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}
