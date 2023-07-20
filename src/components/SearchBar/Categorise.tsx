import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { offsetDelete } from '../../store/Product/QuerySlice'
import { asyncGetProducts, getCategoryProducts } from '../../store/Product/getProducts'
import s from './Categories.module.scss'
export const Categories = () => {
	const [categoriesId, setCategoriesId] = useState(0)
	const productParam = useAppSelector(state => state.queryString)
	const categories = useAppSelector(state => state.categories.categories)
	const offset = useAppSelector(state => state.queryString.offset)
	const sortBy = useAppSelector(state => state.queryString.sortBy)
	const dispatch = useAppDispatch()

	const params = {
		offset: offset,
		limit: 12,
		sortBy: sortBy,
		category: categoriesId,
	}

	useEffect(() => {
		dispatch(offsetDelete())
	}, [categoriesId])

	useEffect(() => {
		if (categoriesId) {
			dispatch(getCategoryProducts(params))
		}
		if (categoriesId == 0) {
			dispatch(asyncGetProducts(productParam))
		}
	}, [offset, sortBy, categoriesId])

	return (
		<div>
			<select className={s.container} onChange={e => setCategoriesId(+e.target.value)}>
				<option value={0}>All products</option>
				{categories.map(category => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</select>
		</div>
	)
}
