import { Stack, Typography, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export interface UsersHeaderProps {
  onAdd: () => void
}

export function UsersHeader({ onAdd }: UsersHeaderProps) {
  const titleId = 'users-header-title'

  return (
    <Stack
      component="header"
      role="region"
      aria-labelledby={titleId}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      mb={{ xs: 5, md: 5 }}
    >
      <Typography
        id={titleId}
        variant="h4"
        color="primary"
        component="h1"
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        User Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{
          alignSelf: { xs: 'stretch', sm: 'auto' },
        }}
        aria-label="Adicionar novo usuário"
      >
        Add Usuário
      </Button>
    </Stack>
  )
}