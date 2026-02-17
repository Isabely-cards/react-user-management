import type { RootState, AppDispatch } from '../store'
import { sortUsers } from './userSlice'
import { useDispatch } from 'react-redux'

export const selectUsers = (state: RootState) => state.users.users
export const selectLoading = (state: RootState) => state.users.loading
export const selectOrder = (state: RootState) => state.users.order

export const useUsersActions = () => {
  const dispatch = useDispatch<AppDispatch>()
  const handleSort = () => dispatch(sortUsers())
  return { handleSort }
}
