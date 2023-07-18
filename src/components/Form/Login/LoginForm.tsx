import { Field, Form, Formik } from 'formik'
import { FC, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { asyncLoginUser } from '../../../store/User/loginSlice'
import s from './LoginForm.module.scss'

import { useAppDispatch, useAppSelector } from '../../../hook/reduxHook'
import { switchScrollOF, switchScrollON } from '../../../store/Ui_Slice'
import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { InputPassword } from '../../Input/InputPassword'
import { Spinner } from '../../Spinners/Spinners'

export const LoginForm: FC = () => {
	const isLoading = useAppSelector(state => state.login.loading)
	const isLoadingViewer = useAppSelector(state => state.viewer.loading)
	const isUser = useAppSelector(state => state.viewer.isUser)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(switchScrollOF())

		return () => {
			dispatch(switchScrollON())
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
						<Input>
							<Field name='email' placeholder='Email' />
							{errors.email && touched.email && <div>{errors.email}</div>}
						</Input>

						<Input>
							<Field as={InputPassword} name='password' placeholder='Password' />
							{errors.password && touched.password && <div>{errors.password}</div>}
						</Input>
						<Button orange={true} submit={true}>
							<span>{isLoading ? <Spinner size={20} color='white' /> : 'Login'}</span>
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
