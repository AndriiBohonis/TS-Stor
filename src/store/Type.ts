export type UserResponse = {
	token: string
	account: {
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
}
export type User = {
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
export type ProductResponse = {
	category: {
		id: number
		name: string
	}
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
