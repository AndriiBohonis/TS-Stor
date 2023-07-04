import { Outlet } from 'react-router-dom'
import s from './HomePage.module.scss'

import { ProductBar } from '../../components/ProguctBar/ProductBar'
import { SearchBar } from '../../components/SearchBar/SearchBar'

export const HomePage = () => {
	return (
		<section className={s.wrapper}>
			<SearchBar />
			<ProductBar />
			<Outlet />
		</section>
	)
}
