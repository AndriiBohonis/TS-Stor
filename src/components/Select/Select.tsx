import { FC, useEffect } from 'react'
import Select, { StylesConfig } from 'react-select'
import { useAppDispatch } from '../../hook/reduxHook'
import { Country } from '../../store/Type'
import { asyncGetCountry } from '../../store/getCountry'

interface IProps {
	data: Country[]
	selectValue: (str: string) => void
	defaultValue: any
}

export const MySelect: FC<IProps> = ({ data, selectValue, defaultValue }) => {
	const dispatch = useAppDispatch()
	const colourStyles: StylesConfig<any> = {
		control: styles => ({
			...styles,
			backgroundColor: 'white',
			width: '100%',
			marginTop: 10,
			marginBottom: 10,
			height: 40,
			borderBlockColor: '#707070',
		}),
	}
	useEffect(() => {
		dispatch(asyncGetCountry('_'))
	}, [])

	return (
		<Select
			options={data}
			onChange={e => selectValue(e.value)}
			placeholder={'Country'}
			styles={colourStyles}
			defaultInputValue={defaultValue}
		/>
	)
}
