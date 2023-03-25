import React from 'react'
import { useAppDispatch } from '../../hook/reduxHook'
import { offsetDelete, sortBy } from '../../store/QuerySlice'
import s from './Popular.module.scss'

export const Sort = () => {
	const dispatch = useAppDispatch()
	const handlerClick: React.ChangeEventHandler<HTMLSelectElement> = event => {
		const value = event.currentTarget.value
		if (value) {
			dispatch(sortBy(value))
			dispatch(offsetDelete())
		}
	}
	return (
		<div className={s.wrapper}>
			<select className={s.container} onChange={handlerClick}>
				<option value='popular'>Popular</option>
				<option value='latest'>Latest</option>
			</select>
		</div>
	)
}
