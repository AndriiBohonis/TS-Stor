import { FC, useEffect, useState } from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { useAppDispatch } from '../../hook/reduxHook'
import { deleteProductCart } from '../../store/Product/addProductCart'
import { ProductResponse } from '../../store/Type'
import s from './Cart.module.scss'
type Props = {
	data: ProductResponse
}
export const Cart: FC<Props> = ({ data }) => {
	const [price, setPrice] = useState(data.price)
	const [count, setCount] = useState(1)
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (count === 0) {
			dispatch(deleteProductCart(data.id))
		}
	}, [count])

	return (
		<section className={s.container}>
			<div className={s.block_img}>
				<img className={s.img} src={data.picture}></img>
			</div>
			<div className={s.block_info}>
				<h2 className={s.title}>{data.title}</h2>
				<div className={s.block_icons}>
					<RiDeleteBin6Fill className={s.delete_icon} onClick={() => setCount(0)} />
					<IoIosAddCircleOutline
						className={s.plus_icon}
						onClick={() => setCount(prev => prev + 1)}
					/>
					<span className={s.count}>{count}</span>
					<AiOutlineMinusCircle
						className={s.minus_icon}
						onClick={() => setCount(prev => prev - 1)}
					/>
				</div>
			</div>
			<div className={s.block_prise}>
				<h3>Price:</h3>
				<p>${price * count}</p>
			</div>
		</section>
	)
}
