import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductsCategories } from '../../api/Api'
import { Categories } from '../Type'

export const asyncGetCategories = createAsyncThunk<Categories[], unknown, { rejectValue: any }>(
	'getCategories/asyncCategories',
	async function (_, { rejectWithValue }) {
		try {
			const response = await ProductsCategories.getCategories()
			return response.data
		} catch (error) {
			rejectWithValue(error)
		}
	}
)
interface IInitialState {
	categories: Categories[]
	loading: boolean
	error: null | any
}
const initialState: IInitialState = {
	categories: [],
	loading: false,
	error: null,
}
const getCategoriesSlice = createSlice({
	name: 'getCategoriesSlice',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncGetCategories.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(asyncGetCategories.fulfilled, (state, action) => {
				state.loading = false
				state.error = null
				state.categories = action.payload
			})
			.addCase(asyncGetCategories.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})

export default getCategoriesSlice.reducer
