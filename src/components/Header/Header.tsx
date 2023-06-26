import { FC, useEffect } from 'react'

import s from './Header.module.scss'

import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { Logouts } from '../UserAuthBar/UserAuthBar'
import { UserInfo } from '../UserInfo/UserInfo'

import { AiFillHeart } from 'react-icons/ai'
import { MdShoppingCart } from 'react-icons/md'
import { addProductCart } from '../../store/addProductCart'
import { favoriteProducts } from '../../store/getFavoriteProduct'
import { asyncViewer } from '../../store/viewerSlice'

export const Header: FC = () => {
	const viewer = useAppSelector(state => state.viewer.isUser)
	const isUser = useAppSelector(state => state.login.isUser)
	const isRegisterUser = useAppSelector(state => state.register.isUser)
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.cartProduct.products.length)

	useEffect(() => {
		const ids = localStorage.getItem('ids')

		if (ids) {
			const arrUniq = new Set(ids.split(','))
			console.log(Array.from(arrUniq))

			dispatch(addProductCart(Array.from(arrUniq).toString()))
		}
	}, [])

	useEffect(() => {
		dispatch(asyncViewer(''))
	}, [isUser, isRegisterUser])
	return (
		<div className={s.wrapper}>
			<div className={s.wrapper_header}>
				<div>
					<Link onClick={window.location.reload} className={s.logo} to='/'>
						Staff
					</Link>
				</div>

				<div className={s.product_container}>
					{
						<Link to='/'>
							<div onClick={() => dispatch(favoriteProducts(''))}>
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
