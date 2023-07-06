import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { asyncRegisterUser } from '../../../store/User/registerSlice'

import { useAppDispatch, useAppSelector } from '../../../hook/reduxHook'

import s from './RegisterForm.module.scss'

export const RegisterForm: FC = () => {
	const isLoading = useAppSelector(state => state.register.loading)
	const isEmailInvalid = useAppSelector(state => state.register.error)
	const isUser = useAppSelector(state => state.viewer.isUser)
	const navigate = useNavigate()
	const fieldRef = useRef<HTMLHeadingElement>(null)
	useEffect(() => {
		fieldRef.current?.focus()
	}, [])

	useEffect(() => {
		if (isUser) {
			navigate('/')
		}
	}, [isUser])

	const dispatch = useAppDispatch()
	const validateSchema = Yup.object().shape({
		fullName: Yup.string()
			.trim()
			.required('Full name is required')
			.matches(/^[a-zA-Z\s]+$/, 'Invalid full name'),

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
						<Field
							innerRef={fieldRef}
							className={s.input}
							type='text'
							name='fullName'
							placeholder='Full Name'
						/>
						{touched.fullName && <div className={s.error}>{errors.fullName}</div>}
						<Field className={s.input} type='email' name='email' placeholder='Email' />
						{isEmailInvalid === 409 && (
							<div className={s.error}>A user with this email address or password exists</div>
						)}
						{touched.email && <div className={s.error}>{errors.email}</div>}
						<Field className={s.input} type='phone' name='phone' placeholder='Phone Number' />
						{touched.phone && <div className={s.error}>{errors.phone}</div>}
						<Field className={s.input} type='password' name='password' placeholder='Password' />
						{isEmailInvalid === 409 && (
							<div className={s.error}>A user with this email address or password exists</div>
						)}
						{touched.password && <div className={s.error}>{errors.password}</div>}
						<button className={s.button} type='submit'>
							<samp className={s.button_text}>{isLoading ? 'Loading...' : 'Register'}</samp>
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
