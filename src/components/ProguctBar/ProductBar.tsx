import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { offset } from '../../store/Product/QuerySlice'
import { ProductResponse } from '../../store/Type'
import { ProductCart } from '../ProductCart/ProductCart'

import s from './PriductBar.module.scss'

export const ProductBar = () => {
	const dispatch = useAppDispatch()
	const { products, loading } = useAppSelector(state => state.products)
	// const SearchLoading = useAppSelector(state => state.asyncSearch.loading)
	// const loading = useAppSelector(state => state.products.loading)
	// const categoryLoading = useAppSelector(state => state.productCategory.loading)
	// const size = useAppSelector(state => state.product.products.length)
	let size = products.length
	const handelClick = () => {
		window.scrollTo(0, 0)
		dispatch(offset())
	}
	if (!products.length) {
		return <h2>Product not found</h2>
	}

	return (
		<section>
			<div className={s.home_container}>
				{loading ? (
					<p>Loading...</p>
				) : (
					products.map((product: ProductResponse) => (
						<ProductCart key={product.id} data={product} />
					))
				)}
			</div>

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
