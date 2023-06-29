import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../api/Api'
import { ProductResponse } from './Type'
import { addProduct } from './loadingProduct'

export type ParametersType = {
	offset?: number
	limit?: number
	sortBy?: string
}

export const asyncGetProducts = createAsyncThunk<ProductResponse[], any, { rejectValue: any }>(
	'getProducts/asyncProducts',
	async function ({ offset, limit, sortBy }, { rejectWithValue, dispatch }) {
		try {
			const response = await Products.getProducts(offset, limit, sortBy)
			dispatch(addProduct(response.data))
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

interface IInitialState {
	loading: boolean
	error: null | any
}
const initialState: IInitialState = {
	loading: false,
	error: null,
}

const getProductsSlice = createSlice({
	name: 'getProducts',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncGetProducts.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(asyncGetProducts.fulfilled, (state, action) => {
				state.error = null
				state.loading = false
			})
			.addCase(asyncGetProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})
export const {} = getProductsSlice.actions
export default getProductsSlice.reducer
