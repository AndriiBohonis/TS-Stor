import { FC } from 'react'
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
	return (
		<div className={s.container}>
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
