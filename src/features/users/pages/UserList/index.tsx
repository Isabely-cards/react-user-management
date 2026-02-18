import { useEffect, useState } from 'react'
import {
  Container,
  CircularProgress,
  Box,
  Paper,
  Stack,
  Fade,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../../../store/store'
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from '../../store/reducers/userSlice'
import { userService } from '../../../../services/userService'
import type { User } from '../../types/User'
import {
  selectLoading,
  selectOrder,
  selectUsers,
  useUsersActions,
} from '../../store/reducers/userSelectors'
import {
  UserFormDialog,
  type UserFormData,
} from '../../components/UserFormDialog'
import { UsersHeader } from '../../components/UsersHeader'
import { UsersSearch } from '../../components/UsersSearch'
import { UsersTable } from '../../components/UsersTable'
import { DeleteUserDialog } from '../../components/DeleteUserDialog'

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>()

  const [openForm, setOpenForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deleteUserState, setDeleteUserState] = useState<User | null>(null)
  const users = useSelector(selectUsers)
  const loading = useSelector(selectLoading)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5)
  const order = useSelector(selectOrder)
  const { handleSort } = useUsersActions()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  )
  const totalPages = Math.ceil(filteredUsers.length / pageSize)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [filteredUsers.length, totalPages, currentPage])

  const handleAdd = () => {
    setEditingUser(null)
    setOpenForm(true)
  }

  const handleEdit = (id: string | number) => {
    const user = users.find((u) => u.id === id)
    if (!user) return
    setEditingUser(user)
    setOpenForm(true)
  }

  const handleSubmit = async (data: UserFormData) => {
    if (editingUser) {
      const updated = await userService.update({ ...editingUser, ...data })
      dispatch(updateUser(updated))
    } else {
      const created = await userService.create(data)
      dispatch(addUser(created))
    }
    setOpenForm(false)
    setEditingUser(null)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteUserState) return
    await userService.delete(deleteUserState.id)
    dispatch(deleteUser(deleteUserState.id))
    setDeleteUserState(null)
  }

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress size={50} aria-label="Carregando usuários" />
      </Box>
    )

  return (
    <Container
      aria-label="Lista de usuários"
      maxWidth="lg"
      sx={{
        backgroundColor: 'background.default',
        mt: { xs: 2, sm: 4, md: 6 },
        mb: { xs: 2, sm: 4, md: 6 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Fade in timeout={400}>
        <Paper elevation={3}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
          }}
        >
          <Stack  spacing={{ xs: 2, sm: 3 }}>
            <UsersHeader onAdd={handleAdd} />
            <UsersSearch value={search} onChange={setSearch} />
            <UsersTable
              users={filteredUsers}
              order={order}
              onSort={handleSort}
              onEdit={handleEdit}
              onDelete={setDeleteUserState}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
            />
          </Stack>
        </Paper>
      </Fade>

      <UserFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        defaultValues={
          editingUser
            ? {
              name: editingUser.name,
              email: editingUser.email,
              status: editingUser.status,
            }
            : undefined
        }
        isEditing={!!editingUser}
      />

      <DeleteUserDialog
        open={!!deleteUserState}
        userName={deleteUserState?.name}
        onCancel={() => setDeleteUserState(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Container >
  )
}
