import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Products } from '../api/Api'
import { ProductResponse } from './Type'

export const getProductCart = createAsyncThunk<any, any, { rejectValue: string }>(
	'addProduct/cart',
	async function (ids: any, { rejectWithValue }) {
		try {
			const response = await Products.getCartProduct(ids)
			return response.data
		} catch (e) {
			//@ts-ignore
			return rejectWithValue(e.message)
		}
	}
)

interface IInitialState {
	id: string[]
	products: ProductResponse[]
	loading: boolean
	error: any
}

const initialState: IInitialState = {
	id: [],
	products: [],
	loading: false,
	error: '',
}

const cartProduct = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		addProductCart(state, action: any) {
			state.id.push(action.payload)
			localStorage.setItem('ids', state.id.join(','))
		},
		deleteProductCart(state, action) {
			state.id = state.id.filter(id => id != action.payload)
			state.products = state.products.filter(product => product.id != action.payload)
			localStorage.setItem('ids', state.id.join(','))
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
export const { addProductCart, deleteProductCart } = cartProduct.actions
export default cartProduct.reducer
