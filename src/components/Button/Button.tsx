import { FC, ReactNode } from 'react'
import s from './Button.module.scss'
interface IProps {
	children: ReactNode
	click?: () => void
	orange?: boolean
	submit?: boolean
}
export const Button: FC<IProps> = ({ children, click, submit, orange }) => {
	const handlerClick: React.MouseEventHandler<HTMLButtonElement> = () => {
		if (click) {
			click()
		}
	}
	return (
		<button
			type={submit ? 'submit' : 'button'}
			onClick={handlerClick}
			className={orange ? [s.button, s.button_orange].join(' ') : s.button}
		>
			{children}
		</button>
	)
}
