import { FC } from 'react'
import { useAppDispatch } from '../../hook/reduxHook'
import { removeUser } from '../../store/User/viewerSlice'
import s from './Sig.module.scss'
export const Logout: FC = () => {
	const dispatch = useAppDispatch()

	const logoutUserHandler = () => {
		dispatch(removeUser())
		// dispatch(removeUserLogin())
		// localStorage.removeItem('token')
		// Auth.setToken(null)
	}

	return (
		<div className={s.button} onClick={logoutUserHandler}>
			Log Out
		</div>
	)
}
