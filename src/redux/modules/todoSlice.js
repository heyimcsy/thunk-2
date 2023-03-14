import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
}

export const __getTodos = createAsyncThunk('getTodos', async (payload, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:4000/todos')
    console.log('response', response.data)
    //Promise -> resolve(= 네트워크 요청이 성공한 경우 ) -> dispatch 해주는 기능을 가진 API
    return thunkAPI.fulfillWithValue(response.data)
  } catch (error) {
    console.log('error', error)
    return thunkAPI.rejectWithValue(error)
  }
})

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.fulfilled]: (state, action) => {
      //   console.log('fulfilled:', action)
      state.isLoading = false
      state.isError = false
      state.todos = action.payload
    },
    [__getTodos.pending]: (state, action) => {
      //아직 진행중일 때
      state.isLoading = true
      state.isError = false
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false
      state.isError = true
      state.error = action.payload
    },
  },
})

export const {} = todosSlice.actions
export default todosSlice.reducer
