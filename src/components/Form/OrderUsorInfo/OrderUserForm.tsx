import { Field, Form, Formik } from 'formik'
import { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { useAppSelector } from '../../../hook/reduxHook'

import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { MySelect } from '../../Select/Select'
import s from './OrderUserForm.module.scss'
interface IProps {
	open: boolean
	setOpen?: (nll: any) => void
}
export const OrderUserForm: FC<IProps> = ({ open, setOpen }) => {
	// const isLoading = useAppSelector(state => state.register.loading)
	// const isEmailInvalid = useAppSelector(state => state.register.error)
	// const isUser = useAppSelector(state => state.viewer)
	const country = useAppSelector(state => state.getCountry.country)
	const [selectValue, setSelectValue] = useState('')

	const navigate = useNavigate()
	const fieldRef = useRef<HTMLHeadingElement>(null)

	const validateSchema = Yup.object().shape({
		fullName: Yup.string()
			.trim()
			.required('Full name is required')
			.matches(/^[a-zA-Z\s]+$/, 'Invalid full name'),

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
					fullName: '',
					phone: '',
					city: '',
					address: '',
				}}
				validationSchema={validateSchema}
				onSubmit={values => {
					console.log({ ...values, country: selectValue })
					// dispatch(asyncRegisterUser(values))
				}}
			>
				{({ errors, touched }) => (
					<Form className={open ? [s.form, s.open].join(' ') : s.form}>
						<Input>
							<Field
								autoComplete='off'
								innerRef={fieldRef}
								type='text'
								name='fullName'
								placeholder='Full Name'
							/>
							{touched.fullName && <div>{errors.fullName}</div>}
						</Input>
						<Input>
							<Field type='phone' name='phone' placeholder='Phone Number' />
							{touched.phone && <div>{errors.phone}</div>}
						</Input>

						<MySelect selectValue={setSelectValue} data={country} />

						<Input>
							<Field type='text' name='city' placeholder='City' />
							{touched.city && <div>{errors.city}</div>}
						</Input>
						<Input>
							<Field type='text' name='address' placeholder='Address' />
							{touched.address && <div>{errors.address}</div>}
						</Input>

						<div className={s.price_block}>
							<div></div>
							<div></div>
						</div>
						<Button or={true}>
							<span>Confirms the purchase</span>
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
