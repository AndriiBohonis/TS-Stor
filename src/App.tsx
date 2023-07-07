import { Route, Routes } from 'react-router-dom'
import s from './App.module.scss'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'

import { CartPage } from './pages/CartPage/CartPage'
import { Login } from './pages/UserAuth/Login'
import { RegisterNewUser } from './pages/UserAuth/RegisterNewUser'

import HederMUI from './components/HeaderM/Heder'
import { useAppSelector } from './hook/reduxHook'
import { HomePage } from './pages/Home/HomePage'
import ProductPage from './pages/ProductPage/ProductPage'
export const App = () => {
	const isScroll = useAppSelector(state => state.UI_Slice.scroll)

	return (
		<div className={isScroll ? s.container : s.scroll}>
			<HederMUI />
			<div className={s.content}>
				<Header />
				<main className={s.main}>
					<Routes>
						<Route path='/' element={<HomePage />}>
							<Route path='/product/:id' element={<ProductPage />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<RegisterNewUser />} />
						</Route>
						<Route path='/cart' element={<CartPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</div>
	)
}
