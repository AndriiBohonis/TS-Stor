import { Outlet } from 'react-router-dom'
import s from './HomePage.module.scss'

import { useEffect } from 'react'
import { ProductBar } from '../../components/ProguctBar/ProductBar'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { useAppDispatch } from '../../hook/reduxHook'
import { addProductCart, getProductCart } from '../../store/addProductCart'

export const HomePage = () => {
	return (
		<section className={s.wrapper}>
			<SearchBar />
			<ProductBar />
			<Outlet />
		</section>
	)
}
