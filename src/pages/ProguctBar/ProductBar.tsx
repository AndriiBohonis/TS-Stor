import { ProductCart } from '../../components/ProductCart/ProductCart'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { offset } from '../../store/QuerySlice'
import { ProductResponse } from '../../store/Type'

import s from './PriductBar.module.scss'

export const ProductBar = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.product.products)
	const SearchLoading = useAppSelector(state => state.asyncSearch.loading)
	const loading = useAppSelector(state => state.products.loading)
	const categoryLoading = useAppSelector(state => state.productCategory.loading)
	const size = useAppSelector(state => state.product.products.length)

	const handelClick = () => {
		window.scrollTo(0, 0)
		dispatch(offset())
	}

	return (
		<section>
			<div className={s.home_container}>
				{loading || SearchLoading || categoryLoading ? (
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
