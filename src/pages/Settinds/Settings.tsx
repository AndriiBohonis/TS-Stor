import { Outlet } from 'react-router-dom'
import { ChangePassword } from '../../components/Form/ChengPassword/ChangePassword'
import { MainInfo } from '../../components/Form/MainInfo/MainInfo'
import s from './Settings.module.scss'
export const Settings = () => {
	return (
		<div className={s.container}>
			<div className={s.name_block}>
				<div className={s.logo}>TS</div>
				<div className={s.name_user}>Tara Sup</div>
				<nav className={s.nav_block}>
					<div>Edit Account</div>
					<div>Orders History</div>
					<div>Favorites</div>
				</nav>
				<MainInfo />
				<ChangePassword />
				<Outlet />
			</div>
		</div>
	)
}
