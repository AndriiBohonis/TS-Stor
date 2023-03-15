import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import s from './LoginForm.module.scss'
import { asyncLoginUser } from '../../../store/loginSlice'

import { useAppDispatch, useAppSelector } from '../../../hook/reduxHook'

export const LoginForm: FC = () => {
	const isLoading = useAppSelector(state => state.login.loading)
	const isLoadingViewer = useAppSelector(state => state.viewer.loading)
	const isUser = useAppSelector(state => state.viewer.isUser)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	console.log(isUser)
	useEffect(() => {
		if (isUser) {
			navigate('/')
		}
	}, [isUser])

	const validateSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required'),
		password: Yup.string()
			.min(8, 'Too Short!')
			.matches(
				/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
				'invalid password'
			)
			.max(35, 'Too Long!')
			.required('Password is required'),
	})
	return (
		<div>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={validateSchema}
				onSubmit={values => {
					dispatch(asyncLoginUser(values))
					console.log(values)
				}}
			>
				{({ errors, touched }) => (
					<Form className={s.form}>
						<Field className={s.input_login} name='email' placeholder='Email' />
						{errors.email && touched.email && (
							<div className={s.error}>{errors.email}</div>
						)}
						<Field
							className={s.input_password}
							type='password'
							name='password'
							placeholder='Password'
						/>
						{errors.password && touched.password && (
							<div className={s.error}>{errors.password}</div>
						)}
						<button className={s.button} type='submit'>
							<div className={s.button_text}>
								{isLoading || isLoadingViewer ? 'Loading...' : 'Login'}
							</div>
						</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
