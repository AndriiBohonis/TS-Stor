import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppDispatch, useAppSelector } from '../../../hook/reduxHook'

import { asyncCreateOrder } from '../../../store/Orders/createOrdersSlice'
import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { MySelect } from '../../Select/Select'
import { Spinner } from '../../Spinners/Spinners'
import s from './OrderUserForm.module.scss'
interface IProps {
	open: boolean
	setOpen?: (nll: any) => void
}
export const OrderUserForm: FC<IProps> = ({ open, setOpen }) => {
	const { products, totalQuantity } = useAppSelector(state => state.cartProduct)
	const isUser = useAppSelector(state => state.viewer.user)
	const country = useAppSelector(state => state.getCountry.country)
	const { loading } = useAppSelector(state => state.createOrderSlice)
	const [selectValue, setSelectValue] = useState(() => isUser?.country || '')
	const navigate = useNavigate()
	const [totalSum, setTotalSum] = useState(0)
	const [items, setItems] = useState<any>()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const arrSum: number[] = []
		const arrItems: any = []
		products.forEach(item => {
			arrSum.push(item.totalPrice)
			arrItems.push({ productId: item.id, quantity: item.quantity })
		})
		setItems(arrItems)

		if (arrSum.length) {
			setTotalSum(arrSum.reduce((acc, item) => acc + item))
		} else {
			setTotalSum(0)
		}
	}, [products])

	const validateSchema = Yup.object().shape({
		fullName: Yup.string()
			.trim()
			.required('Full name is required')
			.matches(/^[a-zA-Z]+\s+[a-zA-Z]+$/, 'Invalid full name'),

		phone: Yup.string()
			.required('Phone is required')
			.matches(/^(\+)?([0-9]){10,14}$/, 'Invalid phone'),

		city: Yup.string().trim().required('City is required'),

		address: Yup.string().trim().required('Address is required'),
	})
	const handlerClick = () => {
		if (setOpen) {
			setOpen(!open)
		}
	}
	return (
		<div onClick={e => e.stopPropagation()}>
			{open && <div onClick={handlerClick} className={s.open_modal}></div>}
			<Formik
				initialValues={{
					fullName: isUser?.fullName ? isUser?.fullName : '',
					phone: isUser?.phone ? isUser?.phone : '',
					city: isUser?.city ? isUser?.city : '',
					address: isUser?.address ? isUser?.address : '',
				}}
				validationSchema={validateSchema}
				onSubmit={values => {
					const shipment = { ...values, country: selectValue }
					dispatch(asyncCreateOrder({ items, shipment }))
				}}
			>
				{({ errors, touched }) => (
					<Form className={open ? [s.form, s.open].join(' ') : s.form}>
						<Input>
							<Field autoComplete='off' type='text' name='fullName' placeholder='Full Name' />
							{touched.fullName && <div>{errors.fullName}</div>}
						</Input>
						<Input>
							<Field type='phone' name='phone' placeholder='Phone Number' />
							{touched.phone && <div>{errors.phone}</div>}
						</Input>

						<MySelect defaultValue={isUser?.country} selectValue={setSelectValue} data={country} />

						{selectValue ? <></> : <div>Country is required </div>}

						<Input>
							<Field type='text' name='city' placeholder='City' />
							{touched.city && <div>{errors.city}</div>}
						</Input>
						<Input>
							<Field type='text' name='address' placeholder='Address' />
							{touched.address && <div>{errors.address}</div>}
						</Input>

						<div className={s.price_block}>
							<div className={s.price_order}>
								<span>Items</span>
								<span>{totalQuantity}</span>
							</div>
							<div className={s.price_order}>
								<span>Total</span>
								<span>${totalSum}</span>
							</div>
						</div>
						<Button orange={true} submit={true}>
							{!loading ? <span>Confirms the purchase</span> : <Spinner size={20} color='white' />}
						</Button>

						<Button click={() => navigate('/')}>
							<span>Confirms the purchase</span>
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
