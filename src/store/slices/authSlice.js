import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constant"
import Swal from "sweetalert2"

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, credentials)
      const data = await response.json()

      if(!response.ok) {
        return Swal.fire({
          icon: 'error',
          text: data.message
        })
      } else {
        Swal.fire({
          icon: "success",
          text: data.message
        })
        return data
      }
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    detailUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        const token = action?.payload?.data?.token
        if(token) {
          state.token = token
        }
        state.loading = false
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Login failed'
      })
  }
})

export const { detailUser, logout } = authSlice.actions
export default authSlice.reducer