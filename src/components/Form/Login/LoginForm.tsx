import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { asyncLoginUser } from '../../../store/User/loginSlice'
import s from './LoginForm.module.scss'

import { useAppDispatch, useAppSelector } from '../../../hook/reduxHook'
import { setScroll } from '../../../store/Ui_Slice'

export const LoginForm: FC = () => {
	const isLoading = useAppSelector(state => state.login.loading)
	const isLoadingViewer = useAppSelector(state => state.viewer.loading)
	const isUser = useAppSelector(state => state.viewer.isUser)
	const fieldRef = useRef<HTMLHeadingElement>(null)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(setScroll())
		fieldRef.current?.focus()
		return () => {
			dispatch(setScroll())
		}
	}, [])
	useEffect(() => {
		if (isUser) {
			navigate('/')
		}
	}, [isUser])

	const validateSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is required'),
		password: Yup.string()
			.min(8, 'Too Short!')
			.matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/, 'invalid password')
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
				}}
			>
				{({ errors, touched }) => (
					<Form className={s.form}>
						<Field innerRef={fieldRef} className={s.input_login} name='email' placeholder='Email' />
						{errors.email && touched.email && <div className={s.error}>{errors.email}</div>}
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
