import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from '../../api/Api'
import { UserResponse } from '../Type'

type UserLogin = {
	email: string
	password: string
}

export const asyncLoginUser = createAsyncThunk<UserResponse, UserLogin, { rejectValue: any }>(
	'login/asyncLoginUser',
	async function ({ email, password }, { rejectWithValue }) {
		try {
			const response = await Auth.login(email, password)

			return response.data
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

export interface IInitialState {
	user: null | UserResponse
	loading: boolean
	error: null | any
	isUser: boolean
}

const initialState: IInitialState = {
	user: null,
	loading: false,
	error: false,
	isUser: false,
}

const loginSlice = createSlice({
	name: 'login',
	initialState,

	extraReducers(builder) {
		builder
			.addCase(asyncLoginUser.pending, state => {
				state.loading = true
				state.error = false
			})
			.addCase(asyncLoginUser.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
				state.error = false
				state.isUser = true
				localStorage.setItem('token', action.payload.token)
			})
			.addCase(asyncLoginUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
	reducers: {
		removeUserLogin(state) {
			state.isUser = false
		},
	},
})
export const { removeUserLogin } = loginSlice.actions
export default loginSlice.reducer
