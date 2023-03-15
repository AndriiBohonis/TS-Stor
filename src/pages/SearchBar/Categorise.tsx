import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { asyncGetProducts } from '../../store/getProducts'
import { getCategoryProducts } from '../../store/productInCategory'
import { offsetDelete } from '../../store/QuerySlice'
import s from './Categories.module.scss'
export const Categories = () => {
	const [categoriesId, setCategoriesId] = useState(0)
	let [searchParams, setSearchParams] = useSearchParams()
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
			// setSearchParams({
			// 	offset: offset.toString(),
			// 	sort: sortBy,
			// 	category: categoriesId.toString(),
			// })
		}
		if (categoriesId == 0) {
			dispatch(asyncGetProducts(productParam))
			// setSearchParams({
			// 	offset: offset.toString(),
			// 	sort: sortBy,
			// 	category: categoriesId.toString(),
			// })
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
