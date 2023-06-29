import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../api/Api'
import { ProductResponse } from './Type'
import { addProduct } from './loadingProduct'

export type ParametersType = {
	category: number
	offset: number
	limit: number
	sortBy: string
}

export const getCategoryProducts = createAsyncThunk<
	ProductResponse[],
	ParametersType,
	{ rejectValue: any }
>(
	'getCategoryProducts/asyncCategoryProducts',
	async function ({ category, offset, limit, sortBy }, { rejectWithValue, dispatch }) {
		try {
			const response = await Products.filter(category, limit, sortBy, offset)
			dispatch(addProduct(response.data))
			return response.data

			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

interface IInitialState {
	products: ProductResponse[]
	loading: boolean
	error: null | any
}
const initialState: IInitialState = {
	products: [],
	loading: false,
	error: null,
}

const getCategoryProductsSlice = createSlice({
	name: 'getCategoryProducts',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getCategoryProducts.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(getCategoryProducts.fulfilled, (state, action) => {
				state.error = null
				state.loading = false
				state.products = action.payload
			})
			.addCase(getCategoryProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})

export default getCategoryProductsSlice.reducer
