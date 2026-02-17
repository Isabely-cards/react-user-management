import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/store/reducers/userSlice'
import themeReducer from './themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
