import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { favoriteProducts } from '../../store/Product/getProducts'
import { ProductResponse } from '../../store/Type'
import { ProductCart } from '../ProductCart/ProductCart'
import { Spinner } from '../Spinners/Spinners'
import s from './FavoriteProduct.module.scss'
export const FavoriteProduct = () => {
	const dispatch = useAppDispatch()
	const { error, loading, products } = useAppSelector(state => state.products)

	useEffect(() => {
		dispatch(favoriteProducts(''))
	}, [])
	return (
		<div className={s.container}>
			{loading ? (
				<Spinner size={300} color='#fd7114' />
			) : (
				products.map((product: ProductResponse) => <ProductCart key={product.id} data={product} />)
			)}
		</div>
	)
}
export default FavoriteProduct
