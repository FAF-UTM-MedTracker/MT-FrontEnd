import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';



const backendURL = 'https://medtrackerapi.azurewebsites.net'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials:any, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      }
      console.log(credentials)
      await axios.post(
        `${backendURL}/auth/register`,
        credentials
        // config
      ).then((res)=>res.data)

    } catch (error: any) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const userLogin = createAsyncThunk(
  'auth/login',
  async (credentials: any, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }

      console.log(credentials)
      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        credentials,
        // config
      )
      // store user's token in local storage
      localStorage.setItem('userToken', data.userToken)
      return data
    } catch (error:any) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null


const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken,
  error: null,
  success: false, // for monitoring the registration process.
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
      builder
      .addCase(registerUser.pending, (state,action: PayloadAction<any>) => {
          state.loading = true
          state.success = false
          state.error = null
      })
      
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false
          state.success = true // registration successful
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false
          state.error = action.payload
      })

      .addCase(userLogin.pending, (state,action: PayloadAction<any>) => {
        state.loading = true
        state.success = false
        state.error = null
    })
    
    .addCase(userLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false
        // state.userInfo = action.payload
        // state.userToken = action.payload.userToken
        state.success = true // registration successful
    })
    .addCase(userLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
        // state.message = action.payload.message
    })

  },
})
  
  export const authReducer = authSlice.reducer

