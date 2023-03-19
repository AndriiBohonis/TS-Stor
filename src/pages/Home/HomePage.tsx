import { Outlet } from 'react-router-dom'
import s from './HomePage.module.scss'

import { useEffect } from 'react'
import { useAppDispatch } from '../../hook/reduxHook'
import { addProductCart } from '../../store/addProductCart'
import { ProductBar } from '../ProguctBar/ProductBar'
import { SearchBar } from '../SearchBar/SearchBar'

export const HomePage = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		const ids = localStorage.getItem('ids')

		if (ids) {
			const arruniq = new Set(ids.split(','))
			console.log(Array.from(arruniq))
			//@ts-ignore
			dispatch(addProductCart(Array.from(arruniq).toString()))
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
