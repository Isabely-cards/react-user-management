import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toggleDarkMode } from '../../../../store/themeSlice'
import type { AppDispatch, RootState } from '../../../../store/store'

export function Sidebar() {
  const dispatch = useDispatch<AppDispatch>()
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const [open, setOpen] = useState(true)

  return (
    <>
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 2000 }}
          color="inherit"
          aria-label="Abrir menu"
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
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
          <IconButton onClick={() => setOpen(false)}>{'<'}</IconButton>
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
            onClick={() => dispatch(toggleDarkMode())}
            color="inherit"
            aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
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
