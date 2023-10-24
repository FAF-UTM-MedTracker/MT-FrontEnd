import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from '../slices/authSlice'
import { treatmentReducer } from '../slices/treatmentSlice'
import { patientReducer } from '../slices/patientSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    treatments: treatmentReducer,
    patients: patientReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch