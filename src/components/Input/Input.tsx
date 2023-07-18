import { FC, ReactNode, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import s from './Input.module.scss'
interface IProps {
	children: ReactNode
	password?: boolean
}
export const Input: FC<IProps> = ({ children, password }) => {
	const [viewPassword, setViewPassword] = useState(true)

	return (
		<div className={s.wrapper_input}>
			{children}
			{password && (
				<span onClick={() => setViewPassword(!viewPassword)}>
					{viewPassword ? (
						<AiFillEyeInvisible className={s.eye_icon} />
					) : (
						<AiFillEye className={s.eye_icon} />
					)}
				</span>
			)}
		</div>
	)
}
