import { Outlet } from 'react-router-dom'
import s from './HomePage.module.scss'

import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'

import { offset } from '../../store/QuerySlice'
import { ProductBar } from '../ProguctBar/ProductBar'
import { SearchBar } from '../SearchBar/SearchBar'

export const HomePage = () => {
	const dispatch = useAppDispatch()
	const size = useAppSelector(state => state.product.products.length)

	const handelClick = () => {
		window.scrollTo(0, 0)
		dispatch(offset())
	}
	return (
		<section className={s.wrapper}>
			<SearchBar />
			<ProductBar />
			<Outlet />
			<div className={s.button_pos}>
				{size % 12 === 0 && size !== 0 && (
					<button className={s.button} onClick={handelClick}>
						Moore
					</button>
				)}
			</div>
		</section>
	)
}
