import { FC } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../hook/reduxHook'
import { deleteAllProductFromCart } from '../../../store/CartStor/addProductCart'
import { Button } from '../../Button/Button'
import Popup from '../../Popup/Popup'
import s from '../Alert.module.scss'

interface IProps {
	openAlert: boolean
	setOpenAlert: (event: boolean) => void
}

export const AlertOrder: FC<IProps> = ({ openAlert, setOpenAlert }) => {
	const dispatch = useAppDispatch()
	return (
		<Popup onMove={() => setOpenAlert(!openAlert)}>
			<div onClick={e => e.stopPropagation()} className={s.container}>
				<div className={s.delete} onClick={() => setOpenAlert(!openAlert)}>
					<AiOutlineClose />
				</div>
				<h2>Thank you for your purchase</h2>
				<p>We will send you a notification when your order arrives to you</p>
				<Link to='/'>
					<Button orange={true}>
						<span>Continue shopping</span>
					</Button>
				</Link>
				<Link to='/settings/historyOrder'>
					<Button>
						<span>View order history</span>
					</Button>
				</Link>
				<div>
					<Button click={() => dispatch(deleteAllProductFromCart())}>
						<span>Clear the basket</span>
					</Button>
				</div>
			</div>
		</Popup>
	)
}
