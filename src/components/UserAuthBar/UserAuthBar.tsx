import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import s from './UserAuthBar.module.scss'

export const Logouts: FC = () => {
	return (
		<div className={s.container}>
			<div>
				<Link className={s.register} to='/register'>
					REGISTER
				</Link>
			</div>
			<div className={s.line}></div>
			<div>
				<Link className={s.login} to='/login'>
					LOG IN
				</Link>
			</div>
		</div>
	)
}
