import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { ICreateOrders, IResponseOrders } from '../../Type/Type'
import { Orders } from '../../api/Api'

export const asyncCreateOrder = createAsyncThunk<
	IResponseOrders,
	ICreateOrders,
	{ rejectValue: AxiosError }
>(' createOrderSlice/asyncCreateOrder', async function (data, { rejectWithValue }) {
	try {
		const response = await Orders.createOrders(data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return rejectWithValue(error)
		}
	}
})
interface IInitialState {
	orderResponse: IResponseOrders | null
	loading: boolean
	error: any
}
const initialState: IInitialState = {
	orderResponse: null,
	loading: false,
	error: null,
}
const createOrderSlice = createSlice({
	name: 'orderListSlice',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncCreateOrder.pending, state => {
				state.loading = true
			})
			.addCase(asyncCreateOrder.fulfilled, (state, action) => {
				state.loading = false
				state.orderResponse = action.payload
			})
			.addCase(asyncCreateOrder.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})

export default createOrderSlice.reducer
