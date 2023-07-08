import { CSSProperties, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

const override: CSSProperties = {
	display: 'block',
	margin: '0 auto',
	borderColor: 'bleak',
}

export const Spinner = () => {
	let [loading, setLoading] = useState(true)

	return (
		<ClipLoader
			color={'white'}
			loading={loading}
			cssOverride={override}
			size={20}
			aria-label='Loading Spinner'
		/>
	)
}
