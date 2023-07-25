import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartProduct from './CartStor/addProductCart'
import createOrderSlice from './Orders/createOrdersSlice'
import currentOrderSlice from './Orders/getCurrentOrdersSlice'
import orderListSlice from './Orders/getOrdersListSlice'
import querySlice from './Product/QuerySlice'
import favoriteSlice from './Product/favoriteSlice'
import getCategoriesSlice from './Product/getCategories'
import getProductSlice from './Product/getProductCart'
import getProductsSlice from './Product/getProducts'
import UI_Slice from './Ui_Slice'
import chengPassword from './User/chengePassword'
import loginSlice from './User/loginSlice'
import registerSlice from './User/registerSlice'
import viewerSlice from './User/viewerSlice'
import getCountrySlice from './getCountry'

const rootReducer = combineReducers({
	login: loginSlice,
	register: registerSlice,
	viewer: viewerSlice,
	products: getProductsSlice,
	productCart: getProductSlice,
	categories: getCategoriesSlice,
	favoriteProduct: favoriteSlice,
	queryString: querySlice,
	cartProduct: cartProduct,
	UI_Slice: UI_Slice,
	getCountry: getCountrySlice,
	createOrderSlice: createOrderSlice,
	orderListSlice: orderListSlice,
	currentOrderSlice: currentOrderSlice,
	chengPassword: chengPassword,
})
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cartProduct', 'viewer'],
	blacklist: [
		'products',
		'productCart',
		'login',
		'register',
		'categories',
		'favoriteProduct',
		'UI_Slice',
		'getCountry',
	],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
