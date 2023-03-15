import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from '../api/Api'
import { IInitialState } from './loginSlice'
import { UserResponse } from './Type'

type User = {
	fullName: string
	email: string
	password: string
	phone: string
}

export const asyncRegisterUser = createAsyncThunk<UserResponse, User, { rejectValue: any }>(
	'register/asyncRegisterUser',
	async function ({ fullName, email, password, phone }, { rejectWithValue }) {
		try {
			const response = await Auth.register(fullName, email, password, phone)

			return response.data
		} catch (error: any) {
			return rejectWithValue(error)
		}
	}
)

const initialState: IInitialState = {
	user: null,
	loading: false,
	error: null,
	isUser: false,
}

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncRegisterUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(asyncRegisterUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
				state.error = null
				state.isUser = true
				localStorage.setItem('token', action.payload.token)
			})
			.addCase(asyncRegisterUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload.response.status
			})
	},
})
export default registerSlice.reducer
