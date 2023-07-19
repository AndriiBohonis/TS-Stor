import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IProduct {
	id: number
	title: string
	price: number
	picture: string
	quantity: number
	totalPrice: number
}
interface IInitialState {
	products: IProduct[]
	totalQuantity: number
}

const initialState: IInitialState = {
	products: [],
	totalQuantity: 0,
}

const cartProduct = createSlice({
	name: 'cartProduct',
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
				state.totalQuantity++
			} else {
				currentItem.quantity++
				currentItem.totalPrice = currentItem.quantity * newItem.price
			}
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
					state.totalQuantity--
				} else {
					currentItem.quantity--
					currentItem.totalPrice = currentItem.quantity * currentItem.price
				}
			}
		},
		deleteProductFromCart(state, action: PayloadAction<number>) {
			const id = action.payload
			state.products = state.products.filter(item => item.id !== id)
			state.totalQuantity--
		},
		deleteAllProductFromCart(state) {
			state.products = []
			state.totalQuantity = 0
		},
	},
})
export const {
	deleteAllProductFromCart,
	addItemToCart,
	decrementItemFromCart,
	deleteProductFromCart,
	incrementProduct,
} = cartProduct.actions
export default cartProduct.reducer
