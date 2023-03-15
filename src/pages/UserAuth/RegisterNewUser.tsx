import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterForm } from '../../components/Form/Register/RegisterForm'
import s from './UserAuth.module.scss'
export const RegisterNewUser: FC = () => {
	return (
		<div className={s.modal}>
			<div className={s.modal__container}>
				<div className={s.modal__content}>
					<Link className={s.delete} to='/'>
						x
					</Link>
					<h2 className={s.modal__title}>Register</h2>
					<RegisterForm />
				</div>
				<div>
					<div className={s.modal__footer}>
						<span>I already have an account,</span>
						<Link className={s.span_a} to='/login'>
							Log In
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
