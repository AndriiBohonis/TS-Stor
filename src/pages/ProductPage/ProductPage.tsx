import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { addProductCart } from '../../store/Product/addProductCart'
import { favoriteProduct, favoriteProductDelete } from '../../store/Product/favoriteSlice'
import { asyncGetProductCart, setScroll } from '../../store/Product/getProductCart'
import { favorite } from '../../store/Product/getProducts'
import s from './ProductPage.module.scss'
const ProductPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const cart = useAppSelector(state => state.productCart.products)
	const isLoading = useAppSelector(state => state.productCart.loading)

	const { id } = useParams()

	useEffect(() => {
		if (id) {
			let num = id?.slice(1)
			dispatch(asyncGetProductCart(+num))
		}
		return () => {
			dispatch(setScroll())
		}
	}, [id])

	const addFavorite = () => {
		if (cart?.id) {
			if (!cart.favorite) {
				dispatch(favorite(cart.id))
				dispatch(favoriteProduct(cart.id))
			}
			if (cart.favorite) {
				dispatch(favoriteProductDelete(cart.id))
				dispatch(favorite(cart.id))
			}
		}
	}
	const addCart = () => {
		if (cart?.id) {
			dispatch(addProductCart(cart.id))
		}
	}

	return (
		<div className={s.modal}>
			<div className={s.container}>
				<div className={s.close} onClick={() => navigate(-1)}>
					<AiOutlineClose />
				</div>
				{isLoading ? (
					<h2>loading...</h2>
				) : (
					<div className={s.product__info}>
						<div className={s.img_block}>
							<img className={s.img} src={cart?.picture}></img>
						</div>
						<div className={s.info}>
							<h2 className={s.title}>{cart?.title}</h2>
							<p className={s.description}>{cart?.description}</p>
							<div className={s.wrapper_price}>
								<div className={s.price_t}>Price</div>
								<div className={s.prise}>${cart?.price}</div>
							</div>
							<div className={s.button_block}>
								<button onClick={addCart}>ADD TO CART</button>
								<button className={cart?.favorite ? s.active : ''} onClick={addFavorite}>
									ADD TO FAVORITES
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
export default ProductPage
