import { configureStore } from '@reduxjs/toolkit'
import querySlice from './Product/QuerySlice'
import cartProduct from './Product/addProductCart'
import favoriteSlice from './Product/favoriteSlice'
import getCategoriesSlice from './Product/getCategories'
import getProductSlice from './Product/getProductCart'
import getProductsSlice from './Product/getProducts'
import loginSlice from './User/loginSlice'
import registerSlice from './User/registerSlice'
import viewerSlice from './User/viewerSlice'

export const store = configureStore({
	reducer: {
		login: loginSlice,
		register: registerSlice,
		viewer: viewerSlice,
		products: getProductsSlice,
		productCart: getProductSlice,
		categories: getCategoriesSlice,
		favoriteProduct: favoriteSlice,
		queryString: querySlice,
		cartProduct: cartProduct,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
