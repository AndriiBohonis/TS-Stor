import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import * as Yup from 'yup'
import s from './ChangePassword.module.scss'

import { Button } from '../../Button/Button'
import { Input } from '../../Input/Input'
import { Spinner } from '../../Spinners/Spinners'

export const ChangePassword: FC = () => {
	// const isLoading = useAppSelector(state => state.login.loading)
	// const isLoadingViewer = useAppSelector(state => state.viewer.loading)
	// const isUser = useAppSelector(state => state.viewer.isUser)
	// const fieldRef = useRef<HTMLHeadingElement>(null)
	// const dispatch = useAppDispatch()
	// const navigate = useNavigate()
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
				onSubmit={values => {}}
			>
				{({ errors, touched }) => (
					<Form className={s.form}>
						<Input>
							<Field type='password' name='currentPassword' placeholder='Current Password' />
							{errors.currentPassword && touched.currentPassword && (
								<div>{errors.currentPassword}</div>
							)}
						</Input>
						<Input>
							<Field type='password' name='newPassword' placeholder='New password' />
							{errors.newPassword && touched.newPassword && <div>{errors.newPassword}</div>}
						</Input>
						<Input>
							<Field type='password' name='confirmPassword' placeholder='Confirm password' />
							{errors.confirmPassword && touched.confirmPassword && (
								<div>{errors.confirmPassword}</div>
							)}
						</Input>
						<Button or={true}>
							<span>{true ? <Spinner size={20} color='white' /> : 'Change password'}</span>
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	)
}
