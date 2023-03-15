import { configureStore } from '@reduxjs/toolkit'
import cartProduct from './addProductCart'
import favoriteSlice from './favoriteSlice'
import getCategoriesSlice from './getCategories'
import getFavoriteProductSlice from './getFavoriteProduct'
import getProductSlice from './getProductCart'
import getProductsSlice from './getProducts'
import loginSlice from './loginSlice'
import prodSlice from './prod'
import getCategoryProductsSlice from './productInCategory'
import querySlice from './QuerySlice'
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
		product: prodSlice,
		cartProduct: cartProduct,
	},
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
