import React, { FC } from 'react'
import { User } from '../../store/Type'
import { Logout } from '../Logout/Signout'
import s from './UserPopup.module.scss'
type Props = {
	user: User | null
}

export const UserPopup: FC<Props> = ({ user }) => {
	return (
		<div className={s.container}>
			<div className={s.name}>{user?.fullName}</div>
			<div className={s.email}>{user?.email}</div>
			<div className={s.line}></div>
			<div className={s.settings}>Settings</div>
			<div className={s.logout}>
				<Logout />
			</div>
		</div>
	)
}
