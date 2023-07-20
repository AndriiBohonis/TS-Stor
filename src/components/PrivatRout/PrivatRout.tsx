import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hook/reduxHook'
interface IProps {
	children: ReactNode
}
export const PrivateRout: FC<IProps> = ({ children }) => {
	const isViewer = useAppSelector(state => state.viewer.isUser)
	if (!isViewer) {
		return <Navigate to='/' replace={true} />
	}
	return <>{children}</>
}
