import { FC, ReactNode, useState } from 'react'
import s from './Button.module.scss'
interface IProps {
	children: ReactNode
	click?: any
	or?: boolean
}
export const Button: FC<IProps> = ({ children, click, or }) => {
	const [isLoading, setIsLoading] = useState<boolean>()
	const [active, setActive] = useState<boolean>()
	const [orang, setOrang] = useState<boolean | undefined>(or)
	const handlerClick = () => {
		if (click) {
			click()
		}
	}
	return (
		<button
			type={orang ? 'submit' : 'button'}
			onClick={handlerClick}
			className={orang ? [s.button, s.button_orange].join(' ') : s.button}
		>
			{children}
		</button>
	)
}
