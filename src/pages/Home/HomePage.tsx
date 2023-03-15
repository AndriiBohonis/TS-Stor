import { Outlet } from 'react-router-dom'
import s from './HomePage.module.scss'

import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'

import { offset } from '../../store/QuerySlice'
import { ProductBar } from '../ProguctBar/ProductBar'

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
			<ProductBar />
			<Outlet />

			{b.length % 12 === 0 && (
				<button className={s.button} onClick={() => dispatch(offset())}>
					Moore
				</button>
			)}
		</section>
	)
}
