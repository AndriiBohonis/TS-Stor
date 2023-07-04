import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Account, Auth } from '../../api/Api'
import { User } from '../Type'

export const asyncViewer = createAsyncThunk<User, unknown, { rejectValue: string }>(
	'login/asyncViewer',
	async function (_, { rejectWithValue }) {
		try {
			const token = localStorage.getItem('token')

			Auth.setToken(token)

			const response = await Account.getUser()
			return response.data
		} catch (e) {
			//@ts-ignore
			return rejectWithValue(e.message)
		}
	}
)
interface IInitialState {
	user: null | User
	loading: boolean
	error: null | any
	isUser: boolean
}

const initialState: IInitialState = {
	user: null,
	loading: false,
	error: null,
	isUser: false,
}
const viewerSlice = createSlice({
	name: 'viewer',
	initialState,

	extraReducers(builder) {
		builder
			.addCase(asyncViewer.pending, state => {
				state.loading = true
			})
			.addCase(asyncViewer.fulfilled, (state, action) => {
				state.user = action.payload
				state.loading = false
				state.isUser = true
			})
			.addCase(asyncViewer.rejected, (state, action) => {
				state.loading = false
			})
	},
	reducers: {
		removeUser(state) {
			state.isUser = false
			localStorage.removeItem('token')
		},
	},
})

export const { removeUser } = viewerSlice.actions
export default viewerSlice.reducer
