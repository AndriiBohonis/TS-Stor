import axios from 'axios'
import { ProductResponse, User, UserResponse } from '../store/Type'

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
}
export const Account = {
	getUser() {
		return axios.get<User>('api/account')
	},
}

export const Products = {
	getProducts(offset = 1, limit = 12, sortBy = 'popular') {
		return axios.get(`api/products?offset=${offset}&limit=${limit}&sortBy=${sortBy}`)
	},
	getProduct(id: number) {
		return axios.get(`api/products/${id}`)
	},
	filter(category: number, limit: number, sortBy: string, offset: number) {
		return axios.get(
			`/api/categories/${category}/products?offset=${offset}&limit=${limit}&sortBy=${sortBy}`
		)
	},
	searchProduct(search: string) {
		return axios.get(`api/products/search?keywords=${search}&offset=0&limit=20`)
	},
	favoriteProduct(id: number) {
		return axios.post(`api/products/${id}/favorite`)
	},
	favoriteProductDelete(id: number) {
		return axios.delete(`api/products/${id}/favorite`)
	},
	getFavoriteProduct() {
		return axios.get<ProductResponse>('/api/products/favorites?offset=0&limit=30')
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

export const orders = {
	getOrders() {
		return axios.get('/api/orders?offset=0&limit=20')
	},
}
export const ProductsCategories = {
	getCategories() {
		return axios.get('api/categories')
	},
}
