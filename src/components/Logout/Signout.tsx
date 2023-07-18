import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hook/reduxHook'
import { removeUser } from '../../store/User/viewerSlice'
import s from './Sig.module.scss'
export const Logout: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logoutUserHandler = () => {
		dispatch(removeUser())
		navigate('/')
	}

	return (
		<div className={s.button} onClick={logoutUserHandler}>
			Log Out
		</div>
	)
}
