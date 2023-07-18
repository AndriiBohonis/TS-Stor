import { ChangePassword } from '../../components/Form/ChengPassword/ChangePassword'
import { MainInfo } from '../../components/Form/MainInfo/MainInfo'
import s from './UserInfoPage.module.scss'
function UserInfoPage() {
	return (
		<div className={s.container}>
			<MainInfo />
			<ChangePassword />
		</div>
	)
}
export default UserInfoPage
