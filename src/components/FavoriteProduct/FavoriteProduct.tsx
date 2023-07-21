import { useEffect } from 'react'
import { ProductResponse } from '../../Type/Type'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { favoriteProducts } from '../../store/Product/getProducts'
import { ProductCart } from '../ProductCart/ProductCart'
import { Spinner } from '../Spinners/Spinners'
import { Wrapper } from '../Wrapper/Wrapper'
import s from './FavoriteProduct.module.scss'
export const FavoriteProduct = () => {
	const dispatch = useAppDispatch()
	const { error, loading, products } = useAppSelector(state => state.products)

	useEffect(() => {
		dispatch(favoriteProducts(''))
	}, [])
	return (
		<Wrapper>
			<div className={s.container}>
				{loading ? (
					<Spinner size={300} color='#fd7114' />
				) : products.length ? (
					products.map((product: ProductResponse) => (
						<ProductCart key={product.id} data={product} />
					))
				) : (
					<div className={s.wrapper}>
						<div className={s.message}>You have not selected anything yet</div>
					</div>
				)}
			</div>
		</Wrapper>
	)
}
export default FavoriteProduct
