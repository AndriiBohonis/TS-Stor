import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hook/reduxHook'
import { ProductResponse } from '../../store/Type'
import { favoriteProduct, favoriteProductDelete } from '../../store/favoriteSlice'
import { favorite } from '../../store/loadingProduct'
import s from './ProductCart.module.scss'
type Props = {
	data: ProductResponse
}

export const ProductCart: FC<Props> = ({ data }) => {
	const dispatch = useAppDispatch()
	const handleProduct = (id: number) => {
		if (data.favorite) {
			dispatch(favoriteProductDelete(id))
			dispatch(favorite(id))
		} else {
			dispatch(favoriteProduct(id))
			dispatch(favorite(id))
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
						<Link className={s.text} to={`product/:${data.id}`}>
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
