import { FC, useEffect } from 'react'

import s from './Header.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { Logouts } from '../UserAuthBar/UserAuthBar'
import { UserInfo } from '../UserInfo/UserInfo'

import { AiFillHeart } from 'react-icons/ai'
import { MdShoppingCart } from 'react-icons/md'
import { favoriteProducts } from '../../store/Product/getProducts'
import { asyncViewer } from '../../store/User/viewerSlice'

export const Header: FC = () => {
	const viewer = useAppSelector(state => state.viewer.isUser)
	const isUser = useAppSelector(state => state.login.isUser)
	const isRegisterUser = useAppSelector(state => state.register.isUser)
	const products = useAppSelector(state => state.cartProduct.id.length)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(asyncViewer(''))
	}, [isUser, isRegisterUser])
	const favoriteHandler: React.MouseEventHandler<HTMLDivElement> = () => {
		if (viewer) {
			dispatch(favoriteProducts(''))
		} else {
			alert('First log in')
		}
	}
	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_header}>
				<div>
					<Link className={s.logo} to='/'>
						Staff
					</Link>
				</div>

				<div className={s.product_container}>
					{
						<Link to='/'>
							<div onClick={favoriteHandler}>
								<AiFillHeart className={s.selectedProduct} />
							</div>
						</Link>
					}
					<Link to='/cart'>
						<MdShoppingCart className={s.cart} />

						{products ? <div className={s.cart_counter}>{products}</div> : ''}
					</Link>

					{viewer ? <UserInfo /> : <Logouts />}
				</div>
			</div>
		</div>
	)
}
