import React, { FC } from 'react'
import s from './UserAuth.module.scss'

import { LoginForm } from '../../components/Form/Login/LoginForm'
import { Link } from 'react-router-dom'

export const Login: FC = () => {
	return (
		<div className={s.modal}>
			<div className={s.modal__container}>
				<div className={s.modal__content}>
					<Link className={s.delete} to='/'>
						x
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
		</div>
	)
}
