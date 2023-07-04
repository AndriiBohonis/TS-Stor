import { useEffect } from 'react'
import { useAppDispatch } from '../../hook/reduxHook'
import { asyncGetCategories } from '../../store/Product/getCategories'
import { Categories } from './Categorise'
import { Sort } from './Sort'

import s from './SearchBar.module.scss'
import { SearchProduct } from './SearchProduct'
export const SearchBar = () => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(asyncGetCategories('_'))
	}, [])

	return (
		<section className={s.wrapper}>
			<div className={s.container}>
				<SearchProduct />
				<Categories />
				<Sort />
			</div>
		</section>
	)
}
