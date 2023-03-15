import { createSlice } from '@reduxjs/toolkit'
import { ProductResponse } from './Type'

const initialState = {
	products: [] as ProductResponse[],
}
export const prodSlice = createSlice({
	name: 'queryString',
	initialState,
	reducers: {
		addProd(state, action) {
			state.products = action.payload
		},
		favorite(state, action) {
			state.products.map(product => {
				product.id === action.payload
					? (product.favorite = !product.favorite)
					: (product.favorite = product.favorite)
			})
		},
	},
})
export const { addProd, favorite } = prodSlice.actions
export default prodSlice.reducer
