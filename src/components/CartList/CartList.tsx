import { FC, useEffect, useRef } from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hook/reduxHook'
import {
	IProduct,
	decrementItemFromCart,
	deleteProductFromCart,
	incrementProduct,
} from '../../store/CartStor/addProductCart'
import s from './CartList.module.scss'

type Props = {
	data: IProduct
}
export const CartList: FC<Props> = ({ data }) => {
	const dispatch = useAppDispatch()
	const ref = useRef<HTMLHeadingElement>(null)
	const timeRef = useRef<ReturnType<typeof setTimeout>>()

	const handlerClick = () => {
		const wrapper = ref.current
		if (wrapper) {
			wrapper.classList.toggle(s.anime)
			timeRef.current = setTimeout(() => dispatch(deleteProductFromCart(data.id)), 800)
		}
	}
	useEffect(() => {
		return () => {
			clearTimeout(timeRef.current)
		}
	}, [])
	return (
		<section ref={ref} className={s.container}>
			<div className={s.left_block}>
				<div className={s.block_img}>
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
				<div className={s.block_info}>
					<Link to={`/product/${data.id}`}>
						<span className={s.title}>{data.title}</span>
					</Link>
					<div className={s.block_icons}>
						<RiDeleteBin6Fill className={s.icon} onClick={handlerClick} />
						<IoIosAddCircleOutline
							className={s.icon}
							onClick={() => dispatch(incrementProduct(data.id))}
						/>
						<span className={s.count}>{data.quantity}</span>
						<AiOutlineMinusCircle
							className={s.icon}
							onClick={() => dispatch(decrementItemFromCart(data.id))}
						/>
					</div>
				</div>
			</div>
			<div className={s.right_block}>
				<div className={s.divorce}></div>
				<div className={s.block_prise}>
					<h3>Price:</h3>
					<p>${data.totalPrice}</p>
				</div>
			</div>
		</section>
	)
}
