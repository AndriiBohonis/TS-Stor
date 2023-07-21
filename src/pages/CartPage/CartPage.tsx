import { useEffect, useState } from 'react'
import { BsArrowLeftSquare } from 'react-icons/bs'
import { AlertOrder } from '../../components/Alert/AlertOrder/AlertOrder'
import { CartList } from '../../components/CartList/CartList'
import { OrderUserForm } from '../../components/Form/OrderUsorInfo/OrderUserForm'
import Popup from '../../components/Popup/Popup'
import { Wrapper } from '../../components/Wrapper/Wrapper'
import { useAppSelector } from '../../hook/reduxHook'
import { IProduct } from '../../store/CartStor/addProductCart'
import s from './CartPage.module.scss'

export const CartPage = () => {
	const products = useAppSelector(state => state.cartProduct.products)
	const orderResponse = useAppSelector(state => state.createOrderSlice.orderResponse)
	const [open, setOpen] = useState(false)
	const [openAlert, setOpenAlert] = useState(false)
	useEffect(() => {
		setOpenAlert(!!orderResponse)
		setOpen(false)
	}, [orderResponse])
	useEffect(() => {
		setOpenAlert(false)
	}, [])
	return (
		<Wrapper>
			{openAlert && <AlertOrder openAlert={openAlert} setOpenAlert={setOpenAlert} />}
			<div className={s.container}>
				<h2 className={s.title}>My Cart</h2>
				{products.length ? (
					<div className={s.content}>
						<div className={s.wrapper_product}>
							{products.map((product: IProduct) => (
								<CartList key={product.id} data={product} />
							))}
						</div>
						{!open && (
							<div onClick={() => setOpen(!open)} className={s.open_modal}>
								<BsArrowLeftSquare />
							</div>
						)}

						<OrderUserForm open={open} />
						{open && (
							<Popup onMove={() => setOpen(!open)}>
								<OrderUserForm setOpen={setOpen} open={open} />
							</Popup>
						)}
					</div>
				) : (
					<div className={s.message}>
						<p>Cart Empty</p>
					</div>
				)}
			</div>
		</Wrapper>
	)
}
