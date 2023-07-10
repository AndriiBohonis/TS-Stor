import { CSSProperties, FC } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'bleak',
}
interface IProps {
	size: number
	color: string
}
export const Spinner: FC<IProps> = ({ size, color }) => {
	return (
		<ClipLoader
			color={color}
			loading={true}
			cssOverride={override}
			size={size}
			aria-label='Loading Spinner'
		/>
	)
}
