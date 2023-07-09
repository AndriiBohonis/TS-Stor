import { FC } from 'react'
import Select, { StylesConfig } from 'react-select'
import { Country } from '../../store/Type'

interface IProps {
	data: Country[]
	selectValue: (str: string) => void
}

export const MySelect: FC<IProps> = ({ data, selectValue }) => {
	const colourStyles: StylesConfig<any> = {
		control: styles => ({
			...styles,
			backgroundColor: 'white',
			width: 220,
			marginTop: 10,
			marginBottom: 10,
			height: 40,
			borderBlockColor: '#707070',
		}),
	}

	return (
		<Select
			options={data}
			onChange={e => selectValue(e.value)}
			placeholder={'Country'}
			styles={colourStyles}
		/>
	)
}
