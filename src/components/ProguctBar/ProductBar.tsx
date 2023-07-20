import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { offset } from '../../store/Product/QuerySlice'
import { ProductResponse } from '../../Type/Type'
import { ProductCart } from '../ProductCart/ProductCart'
import { Spinner } from '../Spinners/Spinners'

import s from './ProductBar.module.scss'

export const ProductBar = () => {
	const dispatch = useAppDispatch()
	const { products, loading } = useAppSelector(state => state.products)

	let size = products.length
	const handelClick = () => {
		dispatch(offset())
	}

	return (
		<section>
			<div className={s.home_container}>
				{loading ? (
					<Spinner size={300} color='#fd7114' />
				) : (
					products.map((product: ProductResponse) => (
						<ProductCart key={product.id} data={product} />
					))
				)}
			</div>

			<div className={s.button_pos}>
				{size % 12 === 0 && size !== 0 && (
					<button className={s.button} onClick={handelClick}>
						Load more...
					</button>
				)}
			</div>
		</section>
	)
}
