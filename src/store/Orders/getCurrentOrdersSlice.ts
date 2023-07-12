import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Orders } from '../../api/Api'
import { IResponseOrders } from '../Type'

export const asyncCurrentOrder = createAsyncThunk<any, number, { rejectValue: any }>(
	'currentOrderSlice/asyncCurrentOrder ',
	async function (id, { rejectWithValue }) {
		try {
			const response = await Orders.getCurrentOrders(id)
			return response.data
		} catch (error) {
			rejectWithValue(error)
		}
	}
)
interface IInitialState {
	order: IResponseOrders | null
	loading: boolean
	error: any
}
const initialState: IInitialState = {
	order: null,
	loading: false,
	error: null,
}
const currentOrderSlice = createSlice({
	name: 'orderListSlice',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncCurrentOrder.pending, state => {
				state.loading = true
			})
			.addCase(asyncCurrentOrder.fulfilled, (state, action) => {
				state.loading = false
				state.order = action.payload
			})
			.addCase(asyncCurrentOrder.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})

export default currentOrderSlice.reducer
