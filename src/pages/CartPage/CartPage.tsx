import { useEffect, useState } from 'react'
import { Cart } from '../../components/Cart/Cart'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'

import { Button } from '../../components/Button/Button'
import { OrderUserForm } from '../../components/Form/OrderUsorInfo/OrderUserForm'
import Popup from '../../components/Popup/Popup'
import { IProduct } from '../../store/CartStor/addProductCart'
import { asyncGetCountry } from '../../store/getCountry'
import s from './CartPage.module.scss'

export const CartPage = () => {
	const products = useAppSelector(state => state.cartProduct.products)
	const [open, setOpen] = useState(false)
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(asyncGetCountry('_'))
	}, [])

	const [totalSum, setTotalSum] = useState(0)
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
			{products.length ? (
				<div className={s.wrapper}>
					{!open && (
						<div className={s.open_modal}>
							<Button click={() => setOpen(!open)}>
								<span>Open</span>
							</Button>
						</div>
					)}

					<div className={s.wrapper_product}>
						{products.map((product: IProduct) => (
							<Cart key={product.id} data={product} />
						))}
					</div>

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
