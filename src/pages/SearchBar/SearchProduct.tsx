import { debounce } from 'lodash'
import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { asyncGetProducts } from '../../store/getProducts'
import { searchGetProducts } from '../../store/searchAsyncProduct'
import s from './SearchProduct.module.scss'
export const SearchProduct = () => {
	const dispatch = useAppDispatch()

	const productParam = useAppSelector(state => state.queryString)

	const changeHandler: React.ChangeEventHandler<HTMLInputElement> = event => {
		const value = event.target.value
		if (value.length >= 3) {
			dispatch(searchGetProducts({ keywords: value }))
		}
		if (value.length == 0) {
			dispatch(asyncGetProducts(productParam))
		}
	}

	const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

	return (
		<div>
			<input
				className={s.inputSearch}
				onChange={debouncedChangeHandler}
				type='text'
				placeholder='Search...'
			/>
		</div>
	)
}
