import { useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hook/reduxHook'
import s from './Settings.module.scss'
export const Settings = () => {
	const { logo, user } = useAppSelector(state => state.viewer)
	const navigate = useNavigate()
	useEffect(() => {
		navigate('useInfo')
	}, [])
	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<div className={s.name_block}>
					<div className={s.logo}>{logo}</div>
					<div className={s.name_user}>{user?.fullName}</div>
				</div>
				<nav className={s.nav_block}>
					<NavLink
						className={({ isActive }) => (isActive ? [s.link, s.active].join(' ') : s.link)}
						to={'useInfo'}
					>
						<div>Edit Account</div>
					</NavLink>
					<NavLink
						className={({ isActive }) => (isActive ? [s.link, s.active].join(' ') : s.link)}
						to={'historyOrder'}
					>
						<div>Orders History</div>
					</NavLink>

					<NavLink
						className={({ isActive }) => (isActive ? [s.link, s.active].join(' ') : s.link)}
						to={'favorite'}
					>
						<div>Favorites</div>
					</NavLink>
				</nav>
				<div className={s.content_blok}>
					<Outlet />
				</div>
			</div>
		</div>
	)
}
