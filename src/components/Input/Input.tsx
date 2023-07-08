import { FC, ReactNode } from 'react'
import s from './Input.module.scss'
interface IProps {
	children: ReactNode
}
export const Input: FC<IProps> = ({ children }) => {
	return <div className={s.wrapper_input}>{children}</div>
}
