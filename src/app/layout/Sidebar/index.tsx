import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toggleDarkMode } from '../../../store/themeSlice'
import type { AppDispatch, RootState } from '../../../store/store'

const drawerWidth = 240

export function Sidebar() {
  const dispatch = useDispatch<AppDispatch>()
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const [open, setOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleToggle = () => setOpen(!open)

  return (
    <>
      {isMobile && !open && (
        <IconButton
          aria-label="abrir menu"
          onClick={handleToggle}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 2000 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Typography variant="h6">Menu</Typography>

          {isMobile && (
            <IconButton aria-label="fechar menu" onClick={() => setOpen(false)}>
              {'<'}
            </IconButton>
          )}
        </Stack>

        <List>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItemButton>
        </List>

        <Stack
          sx={{ mt: 'auto', p: 2 }}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <IconButton
            aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            onClick={() => dispatch(toggleDarkMode())}
            color="inherit"
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography variant="body2">
            {darkMode ? 'Modo Escuro' : 'Modo Claro'}
          </Typography>
        </Stack>
      </Drawer>
    </>
  )
}
