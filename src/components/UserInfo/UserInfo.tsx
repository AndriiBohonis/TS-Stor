import { FC, memo, useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { useAppSelector } from '../../hook/reduxHook'
import { UserPopup } from '../UserPopup/UserPopap'
import s from './UserInfo.module.scss'

const UserInfo: FC = () => {
	const [popup, setPopup] = useState(false)
	const user = useAppSelector(state => state.viewer.user)
	const logo = useAppSelector(state => state.viewer.logo)

	const handelClickPopup: React.MouseEventHandler<HTMLDivElement> = event => {
		setPopup(!popup)
		event.stopPropagation()
	}
	console.log(user)
	console.log(popup)
	return (
		<div className={s.container}>
			<div className={s.user}>Welcome, {user?.fullName}!</div>
			<div onClick={handelClickPopup} className={s.logo_user}>
				<div className={s.logo_user_text}>{logo}</div>
			</div>
			<div className={!popup ? s.arrow : [s.rote, s.arrow].join(' ')}>
				{<MdOutlineKeyboardArrowDown />}
			</div>
			{popup && <UserPopup popup={popup} setPopup={setPopup} user={user} />}
		</div>
	)
}
export default memo(UserInfo)
