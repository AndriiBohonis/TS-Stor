import { useState } from 'react'
import { BsArrowLeftSquare } from 'react-icons/bs'
import { Cart } from '../../components/Cart/Cart'
import { OrderUserForm } from '../../components/Form/OrderUsorInfo/OrderUserForm'
import Popup from '../../components/Popup/Popup'
import { useAppSelector } from '../../hook/reduxHook'
import { IProduct } from '../../store/CartStor/addProductCart'
import s from './CartPage.module.scss'

export const CartPage = () => {
	const products = useAppSelector(state => state.cartProduct.products)
	const [open, setOpen] = useState(false)

	return (
		<div className={s.container}>
			<h2>My Cart</h2>
			{products.length ? (
				<div className={s.wrapper}>
					<div className={s.wrapper_product}>
						{products.map((product: IProduct) => (
							<Cart key={product.id} data={product} />
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
				<p className={s.message}>Cart Empty</p>
			)}
		</div>
	)
}
