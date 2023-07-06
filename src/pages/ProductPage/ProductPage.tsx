import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineMinusCircle } from 'react-icons/ai'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { addItemToCart, decrementItemFromCart } from '../../store/CartStor/addProductCart'
import { favoriteProduct, favoriteProductDelete } from '../../store/Product/favoriteSlice'
import { asyncGetProductCart } from '../../store/Product/getProductCart'
import { favorite } from '../../store/Product/getProducts'
import { setScroll } from '../../store/Ui_Slice'
import s from './ProductPage.module.scss'
const ProductPage = () => {
	const cart = useAppSelector(state => state.productCart.products)
	const isLoading = useAppSelector(state => state.productCart.loading)
	const productFromCart = useAppSelector(state => state.cartProduct.products)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { id } = useParams()

	const [count, setCount] = useState(0)

	useEffect(() => {
		if (id) {
			const element = productFromCart.filter(item => item.id === +id.slice(1))
			setCount(element[0]?.quantity)
		}
	}, [productFromCart])
	useEffect(() => {
		if (id) {
			dispatch(setScroll())
			const num = id.slice(1)
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
	const modalClick = () => {
		navigate('/')
	}
	return (
		<div onClick={modalClick} className={s.modal}>
			<div onClick={e => e.stopPropagation()} className={s.container}>
				<div className={s.close} onClick={modalClick}>
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
							<p className={s.description}>
								{cart?.description
									? cart?.description
									: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
							</p>
							<div className={s.wrapper_price}>
								<div className={s.price_t}>Price</div>
								<div className={s.prise}>${cart?.price}</div>
							</div>
							<div className={s.block_add_product}>
								<IoIosAddCircleOutline className={s.plus_icon} onClick={addCart} />
								<span className={s.count}>{count || 0}</span>
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
