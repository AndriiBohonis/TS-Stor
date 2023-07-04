import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../../api/Api'

export const favoriteProduct = createAsyncThunk<any, number, { rejectValue: string }>(
	'product/favorite',
	async function (id, { rejectWithValue }) {
		try {
			const response = await Products.favoriteProduct(id)
			return response.data
		} catch (e) {
			//@ts-ignore
			return rejectWithValue(e.message)
		}
	}
)
export const favoriteProductDelete = createAsyncThunk<any, number, { rejectValue: string }>(
	'product/favoriteDelete',
	async function (id, { rejectWithValue }) {
		try {
			const response = await Products.favoriteProductDelete(id)
			return response.data
		} catch (e) {
			//@ts-ignore
			return rejectWithValue(e.message)
		}
	}
)

const initialState = {}
const favoriteSlice = createSlice({
	name: 'favorite',
	initialState,
	reducers: {},
})

export default favoriteSlice.reducer
