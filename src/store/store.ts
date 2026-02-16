import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './reducers/userSlice'
import themeReducer from './reducers/themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch