import axios from 'axios'
import {
	Categories,
	ICreateOrders,
	IResponseCurrentOrders,
	IResponseOrders,
	ProductResponse,
	User,
	UserResponse,
} from '../store/Type'

axios.defaults.baseURL = 'https://demo-api.apiko.academy/'
export const Auth = {
	_token: null as string | null,

	setToken(token: string | null) {
		this._token = token
		token = localStorage.getItem('token')
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	},
	isLoggedIn() {
		return !!this._token
	},

	login(email: string, password: string) {
		return axios.post<UserResponse>('api/auth/login', {
			email,
			password,
		})
	},
	register(fullName: string, email: string, password: string, phone: string) {
		return axios.post<UserResponse>('api/auth/register', {
			fullName,
			email,
			password,
			phone,
		})
	},
	updateUserAccount(body: any) {
		return axios.put('api/account', {
			...body,
		})
	},
	changePassword(body: any) {
		return axios.put('api/account/password', {
			...body,
		})
	},
}
export const Account = {
	getUser() {
		return axios.get<User>('api/account')
	},
}

export const Products = {
	getProducts(offset = 1, limit = 12, sortBy = 'popular') {
		return axios.get<ProductResponse[]>(
			`api/products?offset=${offset}&limit=${limit}&sortBy=${sortBy}`
		)
	},
	getProduct(id: number) {
		return axios.get<ProductResponse>(`api/products/${id}`)
	},
	filter(category: number = 1, limit: number, sortBy: string, offset: number) {
		return axios.get<ProductResponse[]>(
			`/api/categories/${category}/products?offset=${offset}&limit=${limit}&sortBy=${sortBy}`
		)
	},
	searchProduct(keywords: string) {
		return axios.get<ProductResponse[]>(
			`api/products/search?keywords=${keywords}&offset=0&limit=20`
		)
	},
	favoriteProduct(id: number) {
		return axios.post<ProductResponse>(`api/products/${id}/favorite`)
	},
	favoriteProductDelete(id: number) {
		return axios.delete(`api/products/${id}/favorite`)
	},
	getFavoriteProduct() {
		return axios.get<ProductResponse[]>('/api/products/favorites?offset=0&limit=30')
	},
	getCartProduct(arr: any) {
		return axios.get<ProductResponse>(`/api/products/ids?${arr}`)
	},
}

export const country = {
	getCountry() {
		return axios.get('api/locations/countries')
	},
}

export const Orders = {
	getOrders(limit?: number) {
		return axios.get<IResponseOrders[]>('/api/orders?offset=1&limit=20')
	},
	createOrders(body: ICreateOrders) {
		return axios.post('api/orders', {
			...body,
		})
	},
	getCurrentOrders(id: number) {
		return axios.get<IResponseCurrentOrders>(`api/orders/${id}`)
	},
}
export const ProductsCategories = {
	getCategories() {
		return axios.get<Categories[]>('api/categories')
	},
}
