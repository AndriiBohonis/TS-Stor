import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { country } from '../api/Api'
import { Country } from './Type'
// import { Categories } from '../Type'

export const getCountry = createAsyncThunk<string[], unknown, { rejectValue: any }>(
	'getCountry',
	async function (_, { rejectWithValue }) {
		try {
			const response = await country.getCountry()
			return response.data
		} catch (error) {
			rejectWithValue(error)
		}
	}
)
interface IInitialState {
	categories: Country[]
	loading: boolean
	error: null | any
}
const initialState: IInitialState = {
	categories: [],
	loading: false,
	error: null,
}
const getCountrySlice = createSlice({
	name: 'getCategoriesSlice',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getCountry.pending, state => {
				state.loading = true
			})
			.addCase(getCountry.fulfilled, (state, action) => {
				state.loading = false
				const arrCountry = action.payload.map(item => {
					return { value: item, label: item }
				})
				state.categories = arrCountry
			})
			.addCase(getCountry.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})

export default getCountrySlice.reducer
