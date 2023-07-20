import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from '../../api/Api'

interface Password {
	oldPassword: string
	password: string
}
interface Response {
	success: boolean
}

export const asyncChengPassword = createAsyncThunk<Response, Password, { rejectValue: any }>(
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
	response: Response | null
	loading: boolean
	error: any
}

const initialState: IInitialState = {
	response: null,
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
				state.loading = false
			})
			.addCase(asyncChengPassword.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export default chengPassword.reducer
