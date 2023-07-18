import { FC } from 'react'
import { IItemOrder } from '../../store/Type'
import s from './OrderDetailsList.module.scss'
type Props = {
	data: IItemOrder
}
export const OrderDetailsList: FC<Props> = ({ data }) => {
	return (
		<section className={s.container}>
			<div className={s.left_block}>
				<div className={s.block_img}>
					<div
						style={{
							backgroundImage: `url(${data.product.picture})`,
							backgroundSize: 'contain',
							backgroundPositionX: 'center',
							backgroundPositionY: 'center',
							backgroundRepeat: 'no-repeat',
						}}
						className={s.cart__img}
					></div>
				</div>
				<div className={s.block_info}>
					<span className={s.title}>{data.product.title}</span>
					<span>Items: {data.quantity}</span>
				</div>
			</div>
			<div className={s.right_block}>
				<div className={s.divorce}></div>

				<div className={s.block_prise}>
					<h3>Price:</h3>
					<p>${data.product.price}</p>
				</div>
			</div>
		</section>
	)
}
