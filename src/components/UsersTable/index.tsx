import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  TableSortLabel,
  Paper,
  Stack,
  Typography,
  Select,
  Pagination,
  MenuItem,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import type { User } from '../../types/User'

interface Props {
  users: User[]
  order: 'asc' | 'desc'
  onSort: () => void
  onEdit: (id: number | string) => void
  onDelete: (user: User) => void
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

export function UsersTable({
  users,
  order,
  onSort,
  onEdit,
  onDelete,
  currentPage,
  setCurrentPage,
  pageSize,
}: Props) {
  const start = (currentPage - 1) * pageSize
  const end = start + pageSize
  const paginatedUsers = users.slice(start, end)
  const totalPages = Math.ceil(users.length / pageSize)

  return (
    <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Table aria-label="Tabela de usuários cadastrados">
        <TableHead sx={{ backgroundColor: 'secondary.main' }}>
          <TableRow>
            <TableCell sortDirection={order}>
              <TableSortLabel direction={order} active onClick={onSort}>
                Nome
              </TableSortLabel>
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip
                  label={user.status}
                  size="small"
                  color={user.status === 'ativo' ? 'success' : 'error'}
                />
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => onEdit(user.id)}
                  aria-label={`Editar usuário ${user.name}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(user)}
                  aria-label={`Excluir usuário ${user.name}`}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 3, p: 2 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2">Linhas por página:</Typography>
          <Select
            aria-label="Quantidade de linhas por página"
            size="small"
            value={pageSize}
            onChange={() => setCurrentPage(1)}
          >
            {[5, 10, 25].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Pagination
          getItemAriaLabel={(type, page) =>
            type === 'page' ? `Ir para página ${page}` : `Ir para ${type}`
          }
          color="secondary"
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
        />
      </Stack>
    </Paper>
  )
}
