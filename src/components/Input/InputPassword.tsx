import { FieldProps } from 'formik'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import s from './Input.module.scss'

interface IProps {
	as?: string | React.ComponentType<FieldProps['field']>
}
export const InputPassword = (props: IProps) => {
	const [viewPassword, setViewPassword] = useState(true)

	return (
		<>
			<input type={viewPassword ? 'password' : 'text'} {...props} />

			<span onClick={() => setViewPassword(!viewPassword)}>
				{viewPassword ? (
					<AiFillEyeInvisible className={s.eye_icon} />
				) : (
					<AiFillEye className={s.eye_icon} />
				)}
			</span>
		</>
	)
}
