import { FC } from 'react'
import s from './UserAuth.module.scss'

import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { LoginForm } from '../../components/Form/Login/LoginForm'
import Popup from '../../components/Popup/Popup'

export const Login: FC = () => {
	return (
		<Popup path={'/'}>
			<div onClick={e => e.stopPropagation()} className={s.modal__container}>
				<div className={s.modal__content}>
					<Link className={s.delete} to='/'>
						<AiOutlineClose />
					</Link>
					<h2 className={s.modal__title}>Login</h2>
					<LoginForm />
				</div>
				<div className={s.modal__footer}>
					<span>I have no account,</span>
					<Link className={s.span_a} to='/register'>
						Register now
					</Link>
				</div>
			</div>
		</Popup>
	)
}
