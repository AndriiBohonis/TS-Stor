import { Route, Routes } from 'react-router-dom'
import s from './App.module.scss'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'

import { CartPage } from './pages/CartPage/CartPage'
import { Login } from './pages/UserAuth/Login'
import { RegisterNewUser } from './pages/UserAuth/RegisterNewUser'

import { AlertLogin } from './components/Alert/AlertLogin/AlertLogin'
import FavoriteProduct from './components/FavoriteProduct/FavoriteProduct'
import { OrderList } from './components/OrdersList/OrderList'
import { useAppSelector } from './hook/reduxHook'
import { HomePage } from './pages/Home/HomePage'
import OrderDetailsPage from './pages/OrderDiteilsPage/OrderDetailsPage'
import ProductPage from './pages/ProductPage/ProductPage'
import { Settings } from './pages/Settinds/Settings'
import UserInfoPage from './pages/UserInfo/UserInfoPage'
export const App = () => {
	const isScroll = useAppSelector(state => state.UI_Slice.scroll)

	return (
		<div className={isScroll ? s.container : s.scroll}>
			<div className={s.content}>
				<Header />
				<main className={s.main}>
					<Routes>
						<Route path='/' element={<HomePage />}>
							<Route path='alert' element={<AlertLogin />} />
							<Route path='login' element={<Login />} />
							<Route path='register' element={<RegisterNewUser />} />
							<Route path='product/:id' element={<ProductPage />} />
						</Route>
						<Route path='favorite/product/:id' element={<ProductPage />} />
						<Route path='cart' element={<CartPage />} />
						<Route path='settings' element={<Settings />}>
							<Route path='useInfo' element={<UserInfoPage />} />
							<Route path='historyOrder' element={<OrderList />}></Route>
							<Route path='favorite' element={<FavoriteProduct />} />
							<Route path='/settings/historyOrder/:id' element={<OrderDetailsPage />} />
						</Route>
					</Routes>
				</main>
				<Footer />
			</div>
		</div>
	)
}
