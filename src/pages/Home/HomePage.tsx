import { Outlet } from 'react-router-dom'
import s from './HomePage.module.scss'

import { useEffect } from 'react'
import { ProductBar } from '../../components/ProguctBar/ProductBar'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useAppDispatch } from '../../hook/reduxHook'
import { addProductCart, getProductCart } from '../../store/addProductCart'

export const HomePage = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		const ids = localStorage.getItem('ids')

		if (ids) {
			const arrUniq = new Set(ids.split(','))
			console.log(Array.from(arrUniq))

			dispatch(addProductCart(Array.from(arrUniq).toString()))
		}
	}, [])

	return (
		<section className={s.wrapper}>
			<SearchBar />
			<ProductBar />
			<Outlet />
		</section>
	)
}
