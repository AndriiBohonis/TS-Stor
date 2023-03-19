import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../api/Api'
import { addProd } from './prod'
import { ProductResponse } from './Type'

export type SearchType = {
	keywords: string
}
export const searchGetProducts = createAsyncThunk<
	ProductResponse[],
	SearchType,
	{ rejectValue: any }
>(
	'getSearchProducts/SearchAsyncProducts',
	async function ({ keywords }, { rejectWithValue, dispatch }) {
		try {
			const response = await Products.searchProduct(keywords)
			dispatch(addProd(response.data))
			return response.data
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

interface IInitialState {
	searchProducts: ProductResponse[]
	loading: boolean
	error: null | any
	isSearch: boolean
	offset: number
}

const initialState: IInitialState = {
	searchProducts: [],
	loading: false,
	error: null,
	isSearch: false,
	offset: 0,
}

const getSearchProducts = createSlice({
	name: 'getSearchProducts',
	initialState,

	extraReducers(builder) {
		builder
			.addCase(searchGetProducts.pending, state => {
				state.loading = true
				state.error = null
				state.isSearch = true
			})
			.addCase(searchGetProducts.fulfilled, (state, action) => {
				state.isSearch = true
				state.error = null
				state.loading = false
			})
			.addCase(searchGetProducts.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
				state.isSearch = true
			})
	},
	reducers: {
		isSearch(state) {
			state.isSearch = false
		},
		offsetSearch(state, action) {
			state.offset = action.payload
		},
	},
})

export const { isSearch, offsetSearch } = getSearchProducts.actions
export default getSearchProducts.reducer
