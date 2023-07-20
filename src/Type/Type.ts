export interface User {
	id: number
	fullName: string
	createdAt: string
	updatedAt: string
	email: string
	phone: string
	country: string | null
	city: string | null
	address: string | null
}
export interface UserResponse {
	token: string
	account: User
}
export type ProductResponse = {
	category: Categories
	createdAt: string
	description: null
	favorite: boolean
	id: number
	picture: string
	price: number
	title: string
	updatedAt: string
}

export type Categories = {
	id: number
	name: string
}

export type Country = {
	value: string
	label: string
}

interface IShipment {
	fullName: string
	phone: string
	country: string
	city: string
	address: string
}
export interface ICreateOrders {
	items: [
		{
			productId: number
			quantity: number
		}
	]
	shipment: IShipment
}

export interface IResponseOrders {
	id: number
	ownerId: number
	product: ProductResponse[]
	shipment: IShipment
	totalPrice: number
	createdAt: string
	updatedAt: string
}
export interface IItemOrder {
	product: ProductResponse
	quantity: number
	orderedPrice: number
}
export interface IResponseCurrentOrders {
	id: number
	ownerId: number
	items: IItemOrder[]

	shipment: IShipment
	totalPrice: number
	createdAt: string
	updatedAt: string
}

export type ParametersType = {
	category?: number
	offset: number
	limit: number
	sortBy: string
}
