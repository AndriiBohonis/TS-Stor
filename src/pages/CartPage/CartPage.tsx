import { Cart } from '../../components/Cart/Cart'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
// import { IProduct, getProductCart } from '../../store/CartStor/addProductCart'

import { IProduct } from '../../store/CartStor/addProductCart'
import s from './CartPage.module.scss'

export const CartPage = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.cartProduct.products)
	// useEffect(() => {
	// 	const gepStor = localStorage.getItem('ids')?.split(',')

	// 	if (gepStor?.length) {
	// 		const param = gepStor.map(id => `id=${id}&`)
	// 		dispatch(getProductCart(param.join('')))
	// 	}
	// }, [])

	return (
		<div className={s.modal}>
			<div className={s.container}>
				{products ? (
					products.map((product: IProduct) => <Cart key={product.id} data={product} />)
				) : (
					<p className={s.message}>Cart Empty</p>
				)}
			</div>
		</div>
	)
}
