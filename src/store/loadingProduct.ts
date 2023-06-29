import { createSlice } from '@reduxjs/toolkit'
import { ProductResponse } from './Type'

const initialState = {
	products: [] as ProductResponse[],
}
export const loadingProduct = createSlice({
	name: 'queryString',
	initialState,
	reducers: {
		addProduct(state, action) {
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
export const { addProduct, favorite } = loadingProduct.actions
export default loadingProduct.reducer
