import { useEffect, useState } from 'react'
import { BsArrowLeftSquare } from 'react-icons/bs'
import { Cart } from '../../components/Cart/Cart'
import { OrderUserForm } from '../../components/Form/OrderUsorInfo/OrderUserForm'
import Popup from '../../components/Popup/Popup'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { IProduct } from '../../store/CartStor/addProductCart'
import { asyncGetCountry } from '../../store/getCountry'
import s from './CartPage.module.scss'

export const CartPage = () => {
	const { products, totalQuantity } = useAppSelector(state => state.cartProduct)
	const [open, setOpen] = useState(false)
	const dispatch = useAppDispatch()
	const [totalSum, setTotalSum] = useState(0)
	useEffect(() => {
		dispatch(asyncGetCountry('_'))
	}, [])

	useEffect(() => {
		const arrSum: number[] = []
		products.forEach(item => {
			arrSum.push(item.totalPrice)
		})
		if (arrSum.length) {
			setTotalSum(arrSum.reduce((acc, item) => acc + item))
		} else {
			setTotalSum(0)
		}
	}, [products])
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

					<OrderUserForm totalSum={totalSum} totalQuantity={totalQuantity} open={open} />
					{open && (
						<Popup onMove={() => setOpen(!open)}>
							<OrderUserForm
								totalSum={totalSum}
								totalQuantity={totalQuantity}
								setOpen={setOpen}
								open={open}
							/>
						</Popup>
					)}
				</div>
			) : (
				<p className={s.message}>Cart Empty</p>
			)}
		</div>
	)
}
