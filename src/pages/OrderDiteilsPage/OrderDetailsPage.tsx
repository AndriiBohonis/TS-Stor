import { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate, useParams } from 'react-router-dom'
import { OrderDetailsList } from '../../components/OrderDitalseList/OrderDetailsList'
import Popup from '../../components/Popup/Popup'
import { Spinner } from '../../components/Spinners/Spinners'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { asyncCurrentOrder } from '../../store/Orders/getCurrentOrdersSlice'
import { IItemOrder } from '../../store/Type'
import s from './OrderDetailsPage.module.scss'

const OrderDetailsPage = () => {
	const { order, loading, error } = useAppSelector(state => state.currentOrderSlice)
	const navigate = useNavigate()
	const address = `${order?.shipment.address}, ${order?.shipment.city}, ${order?.shipment.country} `
	const dispatch = useAppDispatch()
	const { id } = useParams()
	useEffect(() => {
		if (id) {
			dispatch(asyncCurrentOrder(+id))
		}
	}, [])

	return (
		<Popup path={-1}>
			<div onClick={e => e.stopPropagation()} className={s.container}>
				<div className={s.close} onClick={() => navigate(-1)}>
					<AiOutlineClose />
				</div>
				<div className={s.wrapper}>
					<h2 className={s.title}>Order details ID {order?.id}</h2>
					<div className={s.list_orders}>
						{loading ? (
							<Spinner size={300} color='black' />
						) : (
							order?.items.map((product: IItemOrder) => (
								<OrderDetailsList data={product} key={product.product.id} />
							))
						)}
					</div>
					<div className={s.info_block}>
						<div>
							<span>Data:</span>
							<span className={s.mod}>{order?.createdAt}</span>
							<div>
								<span>Address:</span>
								<span className={s.mod}>{address}</span>
							</div>
						</div>

						<div>
							<div>
								<span>Item:</span>
								<span className={s.mod}>{order?.items.length}</span>
							</div>
							<div>
								<span>Total</span>
								<span className={s.mod}>${order?.totalPrice}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Popup>
	)
}
export default OrderDetailsPage
