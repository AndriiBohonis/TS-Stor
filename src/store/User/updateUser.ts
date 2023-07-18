import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Auth } from '../../api/Api'
import { UserResponse } from '../Type'

export const asyncUpdateUser = createAsyncThunk<UserResponse, any, { rejectValue: any }>(
	'login/asyncLoginUser',
	async function (data, { rejectWithValue }) {
		try {
			const response = await Auth.updateUserAccount(data)

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

const updateUserSlice = createSlice({
	name: 'updateUser',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncUpdateUser.pending, state => {
				state.loading = true
			})
			.addCase(asyncUpdateUser.fulfilled, (state, action) => {
				state.response = action.payload
				state.loading = false
			})
			.addCase(asyncUpdateUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export default updateUserSlice.reducer
