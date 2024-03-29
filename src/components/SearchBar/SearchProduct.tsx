import { debounce } from 'lodash'
import React, { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/reduxHook'
import { asyncGetProducts, searchGetProducts } from '../../store/Product/getProducts'
import s from './SearchProduct.module.scss'
export const SearchProduct = () => {
	const dispatch = useAppDispatch()
	const [inputValue, setInputValue] = useState('')

	const productParam = useAppSelector(state => state.queryString)

	const changeHandler: React.ChangeEventHandler<HTMLInputElement> = event => {
		const value = event.target.value
		setInputValue(value)
		if (value.length >= 3) {
			dispatch(searchGetProducts(value))
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
				value={inputValue}
			/>
		</div>
	)
}
