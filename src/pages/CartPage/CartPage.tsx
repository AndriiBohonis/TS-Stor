import { useEffect, useState } from 'react'
import { Cart } from '../../components/Cart/Cart'
import { useAppSelector } from '../../hook/reduxHook'

import { IProduct } from '../../store/CartStor/addProductCart'
import s from './CartPage.module.scss'

export const CartPage = () => {
	const products = useAppSelector(state => state.cartProduct.products)

	const [totalSum, setTotalSum] = useState(0)
	useEffect(() => {
		const arrSum: number[] = []
		products.forEach(item => {
			arrSum.push(item.totalPrice)
		})
		if (arrSum.length) {
			setTotalSum(arrSum.reduce((acc, item) => acc + item))
		}
		setTotalSum(0)
	}, [products])
	return (
		<div className={s.modal}>
			<div className={s.container}>
				<h2>{totalSum}</h2>
				{products.length ? (
					products.map((product: IProduct) => <Cart key={product.id} data={product} />)
				) : (
					<p className={s.message}>Cart Empty</p>
				)}
			</div>
		</div>
	)
}
