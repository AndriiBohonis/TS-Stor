import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../../api/Api'
import { ProductResponse } from '../Type'

export type ParametersType = {
	category?: number
	offset: number
	limit: number
	sortBy: string
}

export const asyncGetProducts = createAsyncThunk<
	ProductResponse[],
	ParametersType,
	{ rejectValue: any }
>('getProducts/asyncProducts', async function ({ offset, limit, sortBy }, { rejectWithValue }) {
	try {
		const response = await Products.getProducts(offset, limit, sortBy)

		return response.data
	} catch (error) {
		return rejectWithValue(error)
	}
})
export const favoriteProducts = createAsyncThunk<ProductResponse[], unknown, { rejectValue: any }>(
	'getFavorite/favoriteProducts',
	async function (_, { rejectWithValue }) {
		try {
			const response = await Products.getFavoriteProduct()

			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)
export const getCategoryProducts = createAsyncThunk<
	ProductResponse[],
	ParametersType,
	{ rejectValue: any }
>(
	'getCategoryProducts/asyncCategoryProducts',
	async function ({ category, offset, limit, sortBy }, { rejectWithValue }) {
		try {
			const response = await Products.filter(category, limit, sortBy, offset)
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const searchGetProducts = createAsyncThunk<ProductResponse[], string, { rejectValue: any }>(
	'getSearchProducts/SearchAsyncProducts',
	async function (keywords, { rejectWithValue }) {
		try {
			const response = await Products.searchProduct(keywords)

			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

interface IInitialState {
	loading: boolean
	error: null | any
	products: ProductResponse[]
}
const initialState: IInitialState = {
	products: [],
	loading: false,
	error: null,
}

const getProductsSlice = createSlice({
	name: 'getProducts',
	initialState,
	reducers: {
		favorite(state, action: PayloadAction<number>) {
			state.products.map(product => {
				product.id === action.payload
					? (product.favorite = !product.favorite)
					: (product.favorite = product.favorite)
			})
		},
	},
	extraReducers(builder) {
		builder
			.addCase(asyncGetProducts.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(asyncGetProducts.fulfilled, (state, action) => {
				state.products = action.payload
				state.loading = false
			})
			.addCase(asyncGetProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
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
			.addCase(searchGetProducts.pending, state => {
				state.loading = true
			})
			.addCase(searchGetProducts.fulfilled, (state, action) => {
				state.loading = false
				state.products = action.payload
			})
			.addCase(searchGetProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})
export const { favorite } = getProductsSlice.actions
export default getProductsSlice.reducer
