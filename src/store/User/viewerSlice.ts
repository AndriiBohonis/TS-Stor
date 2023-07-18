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
			console.log(response.data)
			return response.data
		} catch (e) {
			//@ts-ignore
			return rejectWithValue(e.message)
		}
	}
)
export const asyncUpdateUser = createAsyncThunk<User, any, { rejectValue: any }>(
	'asyncUpdateUser/UserSlice',
	async function (data, { rejectWithValue }) {
		try {
			const response = await Auth.updateUserAccount(data)

			return response.data
		} catch (e) {
			return rejectWithValue(e)
		}
	}
)

interface IInitialState {
	user: null | User
	loading: boolean
	error: null | any
	isUser: boolean
	logo: string
}

const initialState: IInitialState = {
	user: null,
	loading: false,
	error: null,
	isUser: false,
	logo: '',
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
				const words = action.payload.fullName.split(' ')
				let initials = ''
				state.user = action.payload
				state.loading = false
				state.isUser = true
				if (words) {
					for (let i = 0; i < words.length; i++) {
						const word = words[i]
						initials += word[0]
					}
					state.logo = initials.toUpperCase()
				}
			})
			.addCase(asyncViewer.rejected, (state, action) => {
				state.loading = false
			})
			.addCase(asyncUpdateUser.pending, state => {
				state.loading = true
			})
			.addCase(asyncUpdateUser.fulfilled, (state, action) => {
				const words = action.payload.fullName.split(' ')
				let initials = ''
				state.user = action.payload
				state.loading = false
				state.isUser = true
				if (words) {
					for (let i = 0; i < words.length; i++) {
						const word = words[i]
						initials += word[0]
					}
					state.logo = initials.toUpperCase()
				}
			})
			.addCase(asyncUpdateUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
	reducers: {
		removeUser(state) {
			state.isUser = false
			state.user = null
			localStorage.removeItem('token')
		},
	},
})

export const { removeUser } = viewerSlice.actions
export default viewerSlice.reducer
