import { TextField, Paper, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function UsersSearch({ value, onChange }: Props) {
  const inputId = 'users-search-input'

  return (
    <Paper component="section" aria-labelledby="users-search-label">
      <TextField
        id={inputId}
        fullWidth
        label="Pesquisar usuários"
        placeholder="Digite o nome do usuário"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon aria-hidden="true" />
            </InputAdornment>
          ),
        }}
      />
    </Paper>
  )
}
