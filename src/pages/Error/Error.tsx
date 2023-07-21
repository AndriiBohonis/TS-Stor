import { Wrapper } from '../../components/Wrapper/Wrapper'
import s from './Error.module.scss'
export const Error = () => {
	return (
		<Wrapper>
			<section className={s.container}>
				<div className={s.error}>Not found 404</div>
			</section>
		</Wrapper>
	)
}
