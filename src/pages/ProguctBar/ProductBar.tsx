import { ProductCart } from '../../components/ProductCart/ProductCart'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { ProductResponse } from '../../store/Type'

import s from './PriductBar.module.scss'

export const ProductBar = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.product.products)

	return (
		<div className={s.home_container}>
			{products.map((product: ProductResponse) => (
				<ProductCart key={product.id} data={product} />
			))}
		</div>
	)
}
