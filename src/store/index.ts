import { configureStore } from '@reduxjs/toolkit'
import querySlice from './QuerySlice'
import cartProduct from './addProductCart'
import favoriteSlice from './favoriteSlice'
import getCategoriesSlice from './getCategories'
import getFavoriteProductSlice from './getFavoriteProduct'
import getProductSlice from './getProductCart'
import getProductsSlice from './getProducts'
import loadingProduct from './loadingProduct'
import loginSlice from './loginSlice'
import getCategoryProductsSlice from './productInCategory'
import registerSlice from './registerSlice'
import getSearchProducts from './searchAsyncProduct'
import viewerSlice from './viewerSlice'

export const store = configureStore({
	reducer: {
		login: loginSlice,
		register: registerSlice,
		viewer: viewerSlice,

		products: getProductsSlice,
		productCart: getProductSlice,
		categories: getCategoriesSlice,
		asyncSearch: getSearchProducts,
		productCategory: getCategoryProductsSlice,
		favoriteProduct: favoriteSlice,
		getFavoriteProduct: getFavoriteProductSlice,
		queryString: querySlice,
		product: loadingProduct,
		cartProduct: cartProduct,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
