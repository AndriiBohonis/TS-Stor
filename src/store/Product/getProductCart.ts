import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductResponse } from '../../Type/Type'
import { Products } from '../../api/Api'

export const asyncGetProductCart = createAsyncThunk<ProductResponse, number, { rejectValue: any }>(
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
	products: any
	loading: boolean
	error: null | any
}

const initialState: IInitialState = {
	products: null,
	loading: false,
	error: null,
}

const getProductCartSlice = createSlice({
	name: 'getProductCart',
	initialState,
	reducers: {
		favorite(state) {
			state.products.favorite = !state.products.favorite
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
			})
			.addCase(asyncGetProductCart.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})
export const { favorite } = getProductCartSlice.actions
export default getProductCartSlice.reducer
