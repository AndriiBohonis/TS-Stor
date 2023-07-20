import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IResponseCurrentOrders } from '../../Type/Type'
import { Orders } from '../../api/Api'

export const asyncCurrentOrder = createAsyncThunk<
	IResponseCurrentOrders,
	number,
	{ rejectValue: string }
>('currentOrderSlice/asyncCurrentOrder ', async function (id, { rejectWithValue }) {
	try {
		const response = await Orders.getCurrentOrders(id)
		return response.data
	} catch (error) {
		return rejectWithValue('Error')
	}
})
interface IInitialState {
	order: IResponseCurrentOrders | null
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
