import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Country } from '../Type/Type'
import { country } from '../api/Api'

export const asyncGetCountry = createAsyncThunk<string[], unknown, { rejectValue: string }>(
	'getCountry',
	async function (_, { rejectWithValue }) {
		try {
			const response = await country.getCountry()
			return response.data
		} catch (error) {
			return rejectWithValue('Error')
		}
	}
)
interface IInitialState {
	country: Country[]
	loading: boolean
	error: any
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
