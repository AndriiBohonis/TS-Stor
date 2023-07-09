import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { country } from '../api/Api'
import { Country } from './Type'
// import { Categories } from '../Type'

export const asyncGetCountry = createAsyncThunk<string[], unknown, { rejectValue: any }>(
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
	country: Country[]
	loading: boolean
	error: null | any
}
const initialState: IInitialState = {
	country: [],
	loading: false,
	error: null,
}
const getCountrySlice = createSlice({
	name: 'getCategoriesSlice',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(asyncGetCountry.pending, state => {
				state.loading = true
			})
			.addCase(asyncGetCountry.fulfilled, (state, action) => {
				state.loading = false
				const arrCountry = action.payload.map(item => {
					return { value: item, label: item }
				})
				state.country = arrCountry
			})
			.addCase(asyncGetCountry.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})

export default getCountrySlice.reducer
