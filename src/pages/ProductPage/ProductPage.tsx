import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineMinusCircle } from 'react-icons/ai'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
import Popup from '../../components/Popup/Popup'
import { Spinner } from '../../components/Spinners/Spinners'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { addItemToCart, decrementItemFromCart } from '../../store/CartStor/addProductCart'
import { favoriteProduct, favoriteProductDelete } from '../../store/Product/favoriteSlice'
import { asyncGetProductCart, favorite } from '../../store/Product/getProductCart'
import s from './ProductPage.module.scss'
const ProductPage = () => {
	const cart = useAppSelector(state => state.productCart.products)
	const isLoading = useAppSelector(state => state.productCart.loading)
	const productFromCart = useAppSelector(state => state.cartProduct.products)
	const isUserLogin = useAppSelector(state => state.viewer.user)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { id } = useParams()

	const [count, setCount] = useState(0)
	console.log(cart)
	useEffect(() => {
		if (id) {
			const element = productFromCart.filter(item => item.id === +id)
			setCount(element[0]?.quantity)
		}
	}, [productFromCart])
	useEffect(() => {
		if (id) {
			dispatch(asyncGetProductCart(+id))
		}
	}, [id])

	const addFavorite = () => {
		if (isUserLogin) {
			if (cart?.id) {
				if (!cart.favorite) {
					dispatch(favorite())
					dispatch(favoriteProduct(cart.id))
				}
				if (cart.favorite) {
					dispatch(favoriteProductDelete(cart.id))
					dispatch(favorite())
				}
			}
		} else {
			navigate('alert')
		}
	}
	const addCart = () => {
		if (cart) {
			dispatch(addItemToCart(cart))
		}
	}
	const buyNewHandler = () => {
		if (cart) {
			dispatch(addItemToCart(cart))
		}
		navigate('/cart')
	}

	return (
		<Popup path={-1}>
			<div onClick={e => e.stopPropagation()} className={s.container}>
				<div className={s.close} onClick={() => navigate(-1)}>
					<AiOutlineClose />
				</div>
				{isLoading ? (
					<Spinner size={200} color='#fd7114' />
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
					<Button click={addCart}>
						<span>ADD TO CART</span>
					</Button>
					{!cart?.favorite ? (
						<Button click={addFavorite}>
							<span>ADD TO FAVORITES</span>
						</Button>
					) : (
						<Button orange={true} click={addFavorite}>
							<span>ADDED TO FAVORITES</span>
						</Button>
					)}

					<Button click={buyNewHandler} orange={true}>
						<span>BUY NOW</span>
					</Button>
				</div>
			</div>
		</Popup>
	)
}
export default ProductPage
