import React, { FC } from 'react'
import { Auth } from '../../api/Api'
import { useAppDispatch } from '../../hook/reduxHook'
import { removeUserLogin } from '../../store/loginSlice'
import { removeUser } from '../../store/viewerSlice'
import s from './Sig.module.scss'
export const Logout: FC = () => {
	const dispatch = useAppDispatch()

	const logoutUserHandler = () => {
		dispatch(removeUser())
		dispatch(removeUserLogin())
		localStorage.removeItem('token')
		Auth.setToken(null)
	}

	return (
		<div className={s.button} onClick={logoutUserHandler}>
			Log Out
		</div>
	)
}
