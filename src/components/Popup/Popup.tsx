import { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hook/reduxHook'
import { switchScrollOF, switchScrollON } from '../../store/Ui_Slice'
import s from './Popup.module.scss'
interface IProps {
	children: ReactNode
}
const Popup: FC<IProps> = ({ children }) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(switchScrollOF())

		return () => {
			dispatch(switchScrollON())
		}
	}, [])

	const modalClick = () => {
		navigate(-1)
	}
	return (
		<div onClick={modalClick} className={s.modal}>
			{children}
		</div>
	)
}

export default Popup
