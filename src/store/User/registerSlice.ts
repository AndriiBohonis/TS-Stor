import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from '../../api/Api'
import { UserResponse } from '../Type'
import { IInitialState } from './loginSlice'

interface IUser {
	fullName: string
	email: string
	password: string
	phone: string
}

export const asyncRegisterUser = createAsyncThunk<UserResponse, IUser, { rejectValue: any }>(
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
			})
			.addCase(asyncRegisterUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
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
