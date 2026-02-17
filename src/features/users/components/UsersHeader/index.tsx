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
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={5}
    >
      <Typography id={titleId} variant="h4" color="primary" component="h1">
        User Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAdd}
        aria-label="Adicionar novo usuário"
      >
        Add Usuário
      </Button>
    </Stack>
  )
}
