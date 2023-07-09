import { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hook/reduxHook'
import { switchScrollOF, switchScrollON } from '../../store/Ui_Slice'
import s from './Popup.module.scss'
interface IProps {
	children: ReactNode
	path?: any
	onMove?: () => void
}
const Popup: FC<IProps> = ({ children, path, onMove }) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(switchScrollOF())

		return () => {
			dispatch(switchScrollON())
		}
	}, [])

	const modalClick = () => {
		if (path) {
			navigate(path)
		}
		if (onMove) {
			onMove()
		}
	}
	return (
		<div onClick={modalClick} className={s.modal}>
			{children}
		</div>
	)
}

export default Popup
