import { AiOutlineClose } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../Button/Button'
import Popup from '../../Popup/Popup'
import s from '../Alert.module.scss'

export const AlertLogin = () => {
	const navigate = useNavigate()

	return (
		<Popup path={-1}>
			<div onClick={e => e.stopPropagation()} className={s.container}>
				<Link className={s.delete} to='/'>
					<AiOutlineClose />
				</Link>
				<h2>To continue please register or log in</h2>
				<Link to='/login'>
					<Button orange={true}>
						<span>Continue to sign in</span>
					</Button>
				</Link>
				<Link to='/register'>
					<Button orange={true}>
						<span>Continue to register</span>
					</Button>
				</Link>
				<div>
					<Button click={() => navigate(-1)}>
						<span>Continue as guest</span>
					</Button>
				</div>
			</div>
		</Popup>
	)
}
