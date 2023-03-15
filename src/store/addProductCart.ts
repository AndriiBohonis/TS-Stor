import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../api/Api'

export const getProductCart = createAsyncThunk<any, any, { rejectValue: string }>(
	'addProduct/cart',
	async function (ids: any, { rejectWithValue }) {
		try {
			console.log(ids)
			let qweristr = ids.join('')
			localStorage.setItem('ids', qweristr)

			const response = await Products.getCartProduct(qweristr)
			return response.data
		} catch (e) {
			//@ts-ignore
			return rejectWithValue(e.message)
		}
	}
)
// export const deleteProductCart = createAsyncThunk<any, number, { rejectValue: string }>(
// 	'product/favoriteDelete',
// 	async function (id, { rejectWithValue }) {
// 		try {
// 			const response = await Products.favoriteProductDelete(id)
// 			return response.data
// 		} catch (e) {
// 			//@ts-ignore
// 			return rejectWithValue(e.message)
// 		}
// 	}
// )

const initialState = {
	id: [],
	products: [],
	loading: false,
	error: '' as any,
}

const cartProduct = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		addProductCart(stare, action: any) {
			//@ts-ignore
			stare.id.push(`id=${action.payload}&`)
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getProductCart.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(getProductCart.fulfilled, (state, action) => {
				state.loading = false
				state.error = null
				state.products = action.payload
			})
			.addCase(getProductCart.rejected, (state, action) => {
				state.loading = false
				state.error = action.error
			})
	},
})
export const { addProductCart } = cartProduct.actions
export default cartProduct.reducer
