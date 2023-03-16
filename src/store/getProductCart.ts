import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../api/Api'
import { ProductResponse } from './Type'

export const asyncGetProductCart = createAsyncThunk<ProductResponse, any, { rejectValue: any }>(
	'getProductCart/asyncProductCart',
	async function (id, { rejectWithValue }) {
		try {
			const response = await Products.getProduct(+id)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

interface IInitialState {
	products: null | ProductResponse
	loading: boolean
	error: null | any
	scroll: boolean
}

const initialState: IInitialState = {
	products: null,
	loading: false,
	error: null,
	scroll: true,
}

const getProductCartSlice = createSlice({
	name: 'getProductCart',
	initialState,
	reducers: {
		setScroll(state) {
			state.scroll = true
		},
	},
	extraReducers(builder) {
		builder
			.addCase(asyncGetProductCart.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(asyncGetProductCart.fulfilled, (state, action) => {
				state.error = null
				state.loading = false
				state.products = action.payload
				state.scroll = false
			})
			.addCase(asyncGetProductCart.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})
export const { setScroll } = getProductCartSlice.actions
export default getProductCartSlice.reducer
