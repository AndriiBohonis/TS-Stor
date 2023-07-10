import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../../store/Type'
import { Logout } from '../Logout/Signout'
import s from './UserPopup.module.scss'
type Props = {
	user: User | null
	popup: boolean
	setPopup: (arg: boolean) => void
}

export const UserPopup: FC<Props> = ({ user, popup, setPopup }) => {
	useEffect(() => {
		const handlerClick = (e: any) => {
			const currentClassName = e.target.className
			if (currentClassName !== s.container) {
				setPopup(false)
			}
		}
		document.body.addEventListener('click', handlerClick)
		return () => {
			document.body.removeEventListener('click', handlerClick)
		}
	}, [])
	return (
		<div onClick={e => e.stopPropagation()} className={s.container}>
			<div className={s.name}>{user?.fullName}</div>
			<div className={s.email}>{user?.email}</div>
			<div className={s.line}></div>
			<Link onClick={() => setPopup(!popup)} to={'settings'}>
				<div className={s.settings}>Settings</div>
			</Link>
			<div className={s.logout}>
				<Logout />
			</div>
		</div>
	)
}
