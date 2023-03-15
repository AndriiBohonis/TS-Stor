import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../api/Api'
import { addProd } from './prod'
import { ProductResponse } from './Type'

export const favoriteProducts = createAsyncThunk<any, any, { rejectValue: any }>(
	'getFavorite/favoriteProducts',
	async function (_, { rejectWithValue, dispatch }) {
		try {
			const response = await Products.getFavoriteProduct()

			dispatch(addProd(response.data))
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

interface IInitialState {
	products: [] | ProductResponse[]
	loading: boolean
	error: null | any
}

const initialState: IInitialState = {
	products: [],
	loading: false,
	error: null,
}

const getFavoriteProductSlice = createSlice({
	name: 'getFavoriteProduct',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(favoriteProducts.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(favoriteProducts.fulfilled, (state, action) => {
				state.error = null
				state.loading = false
				state.products = action.payload
			})
			.addCase(favoriteProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})

export default getFavoriteProductSlice.reducer
