import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from '../../api/Api'
import { UserResponse } from '../Type'

type UserLogin = {
	email: string
	password: string
}

export const asyncChengPassword = createAsyncThunk<UserResponse, UserLogin, { rejectValue: any }>(
	'chengPassword/asyncChengPassword',
	async function (password, { rejectWithValue }) {
		try {
			const response = await Auth.changePassword(password)

			return response.data
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export interface IInitialState {
	response: any
	loading: boolean
	error: null | any
}

const initialState: IInitialState = {
	response: false,
	loading: false,
	error: false,
}

const chengPassword = createSlice({
	name: 'chengPassword',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncChengPassword.pending, state => {
				state.loading = true
			})
			.addCase(asyncChengPassword.fulfilled, (state, action) => {
				state.response = action.payload
			})
			.addCase(asyncChengPassword.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export default chengPassword.reducer
