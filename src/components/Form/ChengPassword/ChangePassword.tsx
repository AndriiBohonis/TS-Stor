import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import * as Yup from 'yup'
import s from './ChangePassword.module.scss'

import { useAppDispatch, useAppSelector } from '../../../hook/reduxHook'
import { asyncChengPassword } from '../../../store/User/chengePassword'
import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { InputPassword } from '../../Input/InputPassword'
import { Spinner } from '../../Spinners/Spinners'

export const ChangePassword: FC = () => {
	const loading = useAppSelector(state => state.viewer.loading)
	const dispatch = useAppDispatch()
	const pattern = Yup.string()
		.min(8, 'Too Short!')
		.matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/, 'invalid password')
		.max(35, 'Too Long!')
		.required('Password is required')

	const validateSchema = Yup.object().shape({
		currentPassword: pattern,
		newPassword: pattern,
		confirmPassword: pattern,
	})
	return (
		<div>
			<Formik
				initialValues={{
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				}}
				validationSchema={validateSchema}
				onSubmit={values => {
					const data = {
						oldPassword: values.currentPassword,
						password: values.newPassword,
					}
					dispatch(asyncChengPassword(data))
				}}
			>
				{({ errors, touched }) => (
					<Form className={s.form}>
						<Input>
							<Field as={InputPassword} name='currentPassword' placeholder='Current Password' />
							{errors.currentPassword && touched.currentPassword && (
								<div>{errors.currentPassword}</div>
							)}
						</Input>
						<Input>
							<Field as={InputPassword} name='newPassword' placeholder='New password' />
							{errors.newPassword && touched.newPassword && <div>{errors.newPassword}</div>}
						</Input>
						<Input>
							<Field as={InputPassword} name='confirmPassword' placeholder='Confirm password' />
							{errors.confirmPassword && touched.confirmPassword && (
								<div>{errors.confirmPassword}</div>
							)}
						</Input>

						<Button orange={true} submit={true}>
							{!loading ? <span>Change password</span> : <Spinner size={20} color='white' />}
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
