import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	offset: 1,
	limit: 12,
	sortBy: 'popular',
	category: 1,
}
const querySlice = createSlice({
	name: 'queryString',
	initialState,
	reducers: {
		offset(state) {
			state.offset += 12
		},
		limit(state, action) {},
		sortBy(state, action) {
			state.sortBy = action.payload
		},
		category(state, action) {
			state.category = action.payload
		},
		offsetDelete(state) {
			state.offset = 1
		},
	},
})
export const { offset, limit, sortBy, category, offsetDelete } = querySlice.actions
export default querySlice.reducer
