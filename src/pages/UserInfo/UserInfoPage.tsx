import { ChangePassword } from '../../components/Form/ChengUser/ChangePassword'
import { MainInfo } from '../../components/Form/ChengUser/MainInfo'
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
