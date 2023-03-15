import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Login } from './pages/UserAuth/Login'
import { RegisterNewUser } from './pages/UserAuth/RegisterNewUser'

import s from './App.module.scss'
import { Footer } from './components/Footer/Footer'
import { CartPage } from './pages/CartPage/CartPage'

import { HomePage } from './pages/Home/HomePage'
import ProductPage from './pages/ProductPage/ProductPage'
import { SearchBar } from './pages/SearchBar/SearchBar'

export const App = () => {
	return (
		<div className={s.container}>
			<div className={s.content}>
				<Header />
				<main className={s.main}>
					<SearchBar />
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
