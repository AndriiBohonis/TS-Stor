import { Route, Routes } from 'react-router-dom'
import s from './App.module.scss'
import { AlertLogin } from './components/Alert/AlertLogin/AlertLogin'
import FavoriteProduct from './components/FavoriteProduct/FavoriteProduct'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { OrderList } from './components/OrdersList/OrderList'
import { PrivateRout } from './components/PrivatRout/PrivatRout'
import { useAppSelector } from './hook/reduxHook'
import { CartPage } from './pages/CartPage/CartPage'
import { Error } from './pages/Error/Error'
import { HomePage } from './pages/Home/HomePage'
import OrderDetailsPage from './pages/OrderDiteilsPage/OrderDetailsPage'
import ProductPage from './pages/ProductPage/ProductPage'
import { Settings } from './pages/Settinds/Settings'
import { Login } from './pages/UserAuth/Login'
import { RegisterNewUser } from './pages/UserAuth/RegisterNewUser'
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
							<Route path=':id' element={<ProductPage />} />
						</Route>
						<Route path='/product/:id' element={<ProductPage />} />
						<Route
							path='/favorite'
							element={
								<PrivateRout>
									<FavoriteProduct />
								</PrivateRout>
							}
						/>
						<Route path='cart' element={<CartPage />} />
						<Route
							path='settings'
							element={
								<PrivateRout>
									<Settings />
								</PrivateRout>
							}
						>
							<Route
								path='useInfo'
								element={
									<PrivateRout>
										<UserInfoPage />
									</PrivateRout>
								}
							/>
							<Route
								path='favorite'
								element={
									<PrivateRout>
										<FavoriteProduct />
									</PrivateRout>
								}
							/>
							<Route
								path='historyOrder'
								element={
									<PrivateRout>
										<OrderList />
									</PrivateRout>
								}
							/>
							<Route
								path='/settings/historyOrder/:id'
								element={
									<PrivateRout>
										<OrderDetailsPage />
									</PrivateRout>
								}
							/>
						</Route>
						<Route path='*' element={<Error />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</div>
	)
}
