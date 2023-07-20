import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdShoppingCart } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { ProductResponse } from '../../Type/Type'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { addItemToCart } from '../../store/CartStor/addProductCart'
import { favoriteProduct, favoriteProductDelete } from '../../store/Product/favoriteSlice'
import { favorite } from '../../store/Product/getProducts'
import s from './ProductCart.module.scss'
type Props = {
	data: ProductResponse
}

export const ProductCart: FC<Props> = ({ data }) => {
	const isUser = useAppSelector(state => state.viewer.user)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleProduct: React.MouseEventHandler<HTMLDivElement> = event => {
		event.preventDefault()
		if (isUser) {
			if (data.favorite) {
				dispatch(favoriteProductDelete(data.id))
				dispatch(favorite(data.id))
			} else {
				dispatch(favoriteProduct(data.id))
				dispatch(favorite(data.id))
			}
		} else {
			navigate('alert')
		}
	}

	const addToCartClick: React.MouseEventHandler<HTMLDivElement> = event => {
		event.preventDefault()
		dispatch(addItemToCart({ ...data, quantity: 1, totalPrice: data.price }))
	}

	return (
		<Link className={s.text} to={`/product/${data.id}`}>
			<div className={s.wrapper}>
				<div className={s.cart__container}>
					<div className={s.wrapper__img}>
						<div
							style={{
								backgroundImage: `url(${data.picture})`,
								backgroundSize: 'contain',
								backgroundPositionX: 'center',
								backgroundPositionY: 'center',
								backgroundRepeat: 'no-repeat',
							}}
							className={s.cart__img}
						></div>
					</div>
					<div onClick={handleProduct} className={s.cart__like}>
						<AiOutlineHeart className={data.favorite ? s.hart : ''} />
					</div>
					<div onClick={addToCartClick} className={s.cart}>
						<MdShoppingCart className={''} />
					</div>

					<h2 className={s.cart__title}>{data.title}</h2>
					<div className={s.cart__price}>
						<> $ {data.price}</>
					</div>
				</div>
			</div>
		</Link>
	)
}
