import { useEffect } from 'react'
import { AiOutlineClose, AiOutlineMinusCircle } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
// import { addItemToCart } from '../../store/CartStor/addProductCart'
import { IoIosAddCircleOutline } from 'react-icons/io'
import {
	addItemToCart,
	decrementItemFromCart,
	incrementProduct,
} from '../../store/CartStor/addProductCart'
import { favoriteProduct, favoriteProductDelete } from '../../store/Product/favoriteSlice'
import { asyncGetProductCart, setScroll } from '../../store/Product/getProductCart'
import { favorite } from '../../store/Product/getProducts'
import s from './ProductPage.module.scss'
const ProductPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const cart = useAppSelector(state => state.productCart.products)
	const isLoading = useAppSelector(state => state.productCart.loading)
	const count = useAppSelector(state => state.cartProduct.totalQuantity)

	const { id } = useParams()

	useEffect(() => {
		if (id) {
			const num = id?.slice(1)
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
		if (cart) {
			dispatch(addItemToCart(cart))
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
							<div className={s.block_add_product}>
								<IoIosAddCircleOutline
									className={s.plus_icon}
									onClick={() => dispatch(incrementProduct(cart.id))}
								/>
								<span className={s.count}>{count}</span>
								<AiOutlineMinusCircle
									className={s.minus_icon}
									onClick={() => dispatch(decrementItemFromCart(cart.id))}
								/>
							</div>
						</div>
					</div>
				)}
				<div className={s.button_block}>
					<button onClick={addCart}>ADD TO CART</button>
					<button className={cart?.favorite ? s.active : ''} onClick={addFavorite}>
						ADD TO FAVORITES
					</button>
					<button>BUY NOW</button>
				</div>
			</div>
		</div>
	)
}
export default ProductPage
