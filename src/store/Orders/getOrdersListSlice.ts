import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Orders } from '../../api/Api'
import { ICreateOrders, IResponseOrders } from '../Type'

export const asyncGetOrderList = createAsyncThunk<
	IResponseOrders[],
	ICreateOrders,
	{ rejectValue: any }
>('orderListSlice/asyncGetOrderList ', async function (body, { rejectWithValue }) {
	try {
		const response = await Orders.createOrders(body)
		return response.data
	} catch (error) {
		rejectWithValue(error)
	}
})
interface IInitialState {
	orderList: IResponseOrders[]
	loading: boolean
	error: null | any
}
const initialState: IInitialState = {
	orderList: [],
	loading: false,
	error: null,
}
const orderListSlice = createSlice({
	name: 'orderListSlice',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncGetOrderList.pending, state => {
				state.loading = true
			})
			.addCase(asyncGetOrderList.fulfilled, (state, action) => {
				state.loading = false
				state.orderList = action.payload
			})
			.addCase(asyncGetOrderList.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})

export default orderListSlice.reducer
