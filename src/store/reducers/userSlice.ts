import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { userService } from '../../services/userService'
import type { User } from '../../types/User'

type Order = 'asc' | 'desc'

interface UsersState {
  users: User[]
  loading: boolean
  order: Order
}

const initialState: UsersState = {
  users: [],
  loading: false,
  order: 'asc',
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await userService.getAll()
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    sortUsers(state) {
      state.order = state.order === 'asc' ? 'desc' : 'asc'
      state.users.sort((a, b) =>
        state.order === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name),
      )
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload)
    },
    updateUser(state, action: PayloadAction<User>) {
      state.users = state.users.map((u) =>
        u.id === action.payload.id ? action.payload : u,
      )
    },
    deleteUser(state, action: PayloadAction<string | number>) {
      state.users = state.users.filter((u) => u.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { sortUsers, addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer
