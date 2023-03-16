import { Outlet } from 'react-router-dom'
import s from './HomePage.module.scss'

import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'

import { offset } from '../../store/QuerySlice'
import { ProductBar } from '../ProguctBar/ProductBar'
import { SearchBar } from '../SearchBar/SearchBar'

export const HomePage = () => {
	const dispatch = useAppDispatch()
	const b = useAppSelector(state => state.product.products)
	// const id = useAppSelector(state => state.cartProduct.id)
	// const cartProd = useAppSelector(state => state.cartProduct.products)
	// console.log(cartProd)
	// useEffect(() => {
	// 	dispatch(getProductCart(id))
	// }, [id])
	return (
		<section className={s.wrapper}>
			<SearchBar />
			<ProductBar />
			<Outlet />
			<div className={s.button_pos}>
				{(b.length % 12 === 0 && b.length === 0) || (
					<button className={s.button} onClick={() => dispatch(offset())}>
						Moore
					</button>
				)}
			</div>
		</section>
	)
}
