import { PayloadAction, createSlice } from '@reduxjs/toolkit'

// export const getProductCart = createAsyncThunk<any, any, { rejectValue: string }>(
// 	'addProduct/cart',
// 	async function (ids: any, { rejectWithValue }) {
// 		try {
// 			const response = await Products.getCartProduct(ids)
// 			return response.data
// 		} catch (e) {
// 			// return rejectWithValue(e.message)
// 		}
// 	}
// )
export interface IProduct {
	id: number
	title: string
	price: number
	picture: string
	quantity: number
	totalPrice: number
}
interface IInitialState {
	id: string[]
	products: IProduct[]
	loading: boolean
	error: any
	totalQuantity: number
}

const initialState: IInitialState = {
	id: [],
	products: [],
	loading: false,
	totalQuantity: 0,
	error: '',
}

const cartProduct = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		addItemToCart(state, action: PayloadAction<IProduct>) {
			const newItem = action.payload
			const currentItem = state.products.find(({ id }) => id === newItem.id)
			if (!currentItem) {
				state.products.push({
					id: newItem.id,
					title: newItem.title,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					picture: newItem.picture,
				})
			} else {
				currentItem.quantity++
				currentItem.totalPrice = currentItem.quantity * newItem.price
			}
			state.totalQuantity++
		},
		incrementProduct(state, action: PayloadAction<number>) {
			const id = action.payload
			const currentItem = state.products.find(item => item.id === id)
			if (currentItem) {
				currentItem.quantity++
				currentItem.totalPrice = currentItem.quantity * currentItem.price
			}
		},
		decrementItemFromCart(state, action: PayloadAction<number>) {
			const id = action.payload
			const currentItem = state.products.find(item => item.id === id)
			if (currentItem) {
				if (currentItem.quantity === 1) {
					state.products = state.products.filter(item => item.id !== id)
				} else {
					currentItem.quantity--
					currentItem.totalPrice = currentItem.quantity * currentItem.price
				}
			}
			state.totalQuantity--
		},
		deleteProductFromCart(state, action: PayloadAction<number>) {
			const id = action.payload
			state.products = state.products.filter(item => item.id !== id)
		},
	},
	// extraReducers(builder) {
	// 	builder
	// 		.addCase(getProductCart.pending, state => {
	// 			state.loading = true
	// 			state.error = null
	// 		})
	// 		.addCase(getProductCart.fulfilled, (state, action) => {
	// 			state.loading = false
	// 			state.error = null
	// 			state.products = action.payload
	// 		})
	// 		.addCase(getProductCart.rejected, (state, action) => {
	// 			state.loading = false
	// 			state.error = action.error
	// 		})
	// },
})
export const { addItemToCart, decrementItemFromCart, deleteProductFromCart, incrementProduct } =
	cartProduct.actions
export default cartProduct.reducer
