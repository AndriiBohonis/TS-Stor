import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { App } from './App'

import { persistor, store } from './store'

import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import theme from './styles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</PersistGate>
	</Provider>
)
