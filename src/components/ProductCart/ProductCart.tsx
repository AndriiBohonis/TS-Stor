import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { favoriteProduct, favoriteProductDelete } from '../../store/Product/favoriteSlice'
import { favorite } from '../../store/Product/getProducts'
import { ProductResponse } from '../../store/Type'
import s from './ProductCart.module.scss'
type Props = {
	data: ProductResponse
}

export const ProductCart: FC<Props> = ({ data }) => {
	const isUser = useAppSelector(state => state.viewer.user)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const handleProduct = (id: number) => {
		if (isUser) {
			if (data.favorite) {
				dispatch(favoriteProductDelete(id))
				dispatch(favorite(id))
			} else {
				dispatch(favoriteProduct(id))
				dispatch(favorite(id))
			}
		} else {
			navigate('alert')
		}
	}
	return (
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
				<div onClick={() => handleProduct(data.id)} className={s.cart__like}>
					<AiOutlineHeart className={data.favorite ? s.hart : ''} />
				</div>
				<h2 className={s.cart__title}>
					{
						<Link className={s.text} to={`${data.id}`}>
							{' '}
							{data.title}
						</Link>
					}
				</h2>
				<div className={s.cart__price}>
					<> $ {data.price}</>
				</div>
			</div>
		</div>
	)
}
