import { FC } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { RegisterForm } from '../../components/Form/Register/RegisterForm'
import Popup from '../../components/Popup/Popup'
import s from './UserAuth.module.scss'
export const RegisterNewUser: FC = () => {
	return (
		<Popup path={'/'}>
			<div onClick={e => e.stopPropagation()} className={s.modal__container}>
				<div className={s.modal__content}>
					<Link className={s.delete} to='/'>
						<AiOutlineClose />
					</Link>
					<h2 className={s.modal__title}>Register</h2>
					<RegisterForm />
				</div>
				<div>
					<div className={s.modal__footer}>
						<span>I already have an account,</span>
						<Link className={s.span_a} to='login'>
							Log In
						</Link>
					</div>
				</div>
			</div>
		</Popup>
	)
}
