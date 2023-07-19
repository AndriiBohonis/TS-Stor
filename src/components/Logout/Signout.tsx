import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hook/reduxHook'
import { removeUser } from '../../store/User/viewerSlice'
import s from './Sig.module.scss'
export const Logout: FC = () => {
	const dispatch = useAppDispatch()

	return (
		<Link to={'/'} className={s.button} onClick={() => dispatch(removeUser())}>
			Log Out
		</Link>
	)
}
