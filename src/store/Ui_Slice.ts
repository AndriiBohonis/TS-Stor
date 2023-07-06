import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	scroll: true,
}

const UI_Slice = createSlice({
	name: 'UI_Slice',
	initialState,
	reducers: {
		setScroll(state) {
			state.scroll = !state.scroll
		},
	},
})

export const { setScroll } = UI_Slice.actions
export default UI_Slice.reducer
