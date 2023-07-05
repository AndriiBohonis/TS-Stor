import { FC } from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { useAppDispatch } from '../../hook/reduxHook'
import {
	IProduct,
	decrementItemFromCart,
	deleteProductFromCart,
	incrementProduct,
} from '../../store/CartStor/addProductCart'
import s from './Cart.module.scss'
type Props = {
	data: IProduct
}
export const Cart: FC<Props> = ({ data }) => {
	const dispatch = useAppDispatch()

	return (
		<section className={s.container}>
			<div className={s.block_img}>
				<img className={s.img} src={data.picture}></img>
			</div>
			<div className={s.block_info}>
				<h2 className={s.title}>{data.title}</h2>
				<div className={s.block_icons}>
					<RiDeleteBin6Fill
						className={s.delete_icon}
						onClick={() => dispatch(deleteProductFromCart(data.id))}
					/>
					<IoIosAddCircleOutline
						className={s.plus_icon}
						onClick={() => dispatch(incrementProduct(data.id))}
					/>
					<span className={s.count}>{data.quantity}</span>
					<AiOutlineMinusCircle
						className={s.minus_icon}
						onClick={() => dispatch(decrementItemFromCart(data.id))}
					/>
				</div>
			</div>
			<div className={s.block_prise}>
				<h3>Price:</h3>
				<p>{data.totalPrice}</p>
			</div>
		</section>
	)
}
