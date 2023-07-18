import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../Helpers/Helpers'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { asyncGetOrderList } from '../../store/Orders/getOrdersListSlice'
import { IResponseOrders } from '../../store/Type'
import { Spinner } from '../Spinners/Spinners'
import s from './OrderList.module.scss'
export const OrderList = () => {
	const dispatch = useAppDispatch()
	const { error, loading, orderList } = useAppSelector(state => state.orderListSlice)
	useEffect(() => {
		dispatch(asyncGetOrderList())
	}, [])
	if (orderList) {
	}

	return (
		<section>
			{loading ? (
				<Spinner size={200} color='#fd7114' />
			) : (
				<>
					{orderList.map((order: IResponseOrders) => (
						<div key={order.id} className={s.container}>
							<div className={s.left_block}>
								<div>
									<span>OrderID:</span>
									<Link to={`/settings/historyOrder/${order.id}`}>{order.id}</Link>
								</div>
								<div>
									<span>Data:</span>
									<span className={s.mod}>{formatDate(order.createdAt)}</span>
								</div>
							</div>
							<div className={s.right_block}>
								<div>
									<span>Price</span> <span className={s.mod}>${order.totalPrice}</span>
								</div>
							</div>
						</div>
					))}
				</>
			)}
		</section>
	)
}
