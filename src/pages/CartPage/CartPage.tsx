import { useEffect } from 'react'
import { Cart } from '../../components/Cart/Cart'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { getProductCart } from '../../store/Product/addProductCart'
import { ProductResponse } from '../../store/Type'
import s from './CartPage.module.scss'
export const CartPage = () => {
	const dispatch = useAppDispatch()
	const { products, error, loading } = useAppSelector(state => state.cartProduct)
	useEffect(() => {
		const gepStor = localStorage.getItem('ids')?.split(',')

		if (gepStor?.length) {
			const param = gepStor.map(id => `id=${id}&`)
			dispatch(getProductCart(param.join('')))
		}
	}, [])

	return (
		<div className={s.modal}>
			<div className={s.container}>
				{loading ? (
					<p>Loading...</p>
				) : products.length ? (
					products.map((product: ProductResponse) => <Cart key={product.id} data={product} />)
				) : (
					<p className={s.message}>Cart Empty</p>
				)}
			</div>
		</div>
	)
}
