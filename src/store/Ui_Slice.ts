import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	scroll: true,
}

const UI_Slice = createSlice({
	name: 'UI_Slice',
	initialState,
	reducers: {
		switchScrollOF(state) {
			state.scroll = false
		},
		switchScrollON(state) {
			state.scroll = true
		},
	},
})

export const { switchScrollOF, switchScrollON } = UI_Slice.actions
export default UI_Slice.reducer
