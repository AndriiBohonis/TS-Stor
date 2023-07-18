import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { asyncRegisterUser } from '../../../store/User/registerSlice'

import { useAppDispatch, useAppSelector } from '../../../hook/reduxHook'

import { switchScrollOF, switchScrollON } from '../../../store/Ui_Slice'
import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { InputPassword } from '../../Input/InputPassword'
import { Spinner } from '../../Spinners/Spinners'
import s from './RegisterForm.module.scss'

export const RegisterForm: FC = () => {
	const isLoading = useAppSelector(state => state.register.loading)
	const isEmailInvalid = useAppSelector(state => state.register.error)
	const isUser = useAppSelector(state => state.viewer.isUser)
	const navigate = useNavigate()
	const fieldRef = useRef<HTMLHeadingElement>(null)

	useEffect(() => {
		dispatch(switchScrollOF())
		fieldRef.current?.focus()
		return () => {
			dispatch(switchScrollON())
		}
	}, [])

	useEffect(() => {
		if (isUser) {
			navigate(-1)
		}
	}, [isUser])

	const dispatch = useAppDispatch()
	const validateSchema = Yup.object().shape({
		fullName: Yup.string()
			.trim()
			.required('Full name is required')
			.matches(/^[a-zA-Z]+\s+[a-zA-Z]+$/, 'Invalid full name'),

		email: Yup.string().email('Invalid email').required('Email is required'),
		phone: Yup.string()
			.required('Phone is required')
			.matches(/^(\+)?([0-9]){10,14}$/, 'invalid phone'),
		password: Yup.string()
			.min(8, 'Too Short!')
			.matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/, 'invalid password')
			.required('Password is required')
			.max(35, 'Too Long!'),
	})
	return (
		<div>
			<Formik
				initialValues={{
					fullName: '',
					email: '',
					phone: '',
					password: '',
				}}
				validationSchema={validateSchema}
				onSubmit={values => {
					dispatch(asyncRegisterUser(values))
				}}
			>
				{({ errors, touched }) => (
					<Form className={s.form}>
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
							<Field type='email' name='email' placeholder='Email' />
							{isEmailInvalid === 409 && (
								<div>A user with this email address or password exists</div>
							)}
							{touched.email && <div>{errors.email}</div>}
						</Input>

						<Input>
							<Field type='phone' name='phone' placeholder='Phone Number' />
							{touched.phone && <div>{errors.phone}</div>}
						</Input>

						<Input>
							<Field as={InputPassword} name='password' placeholder='Password' />
							{isEmailInvalid === 409 && (
								<div>A user with this email address or password exists</div>
							)}
							{touched.password && <div>{errors.password}</div>}
						</Input>
						<Button orange={true} submit={true}>
							<span>{isLoading ? <Spinner size={20} color='white' /> : 'Register'}</span>
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
