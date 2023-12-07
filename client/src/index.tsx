import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

import { AuthManager, AuthProvider } from './auth'
import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const authManager = new AuthManager()

fetch('/auth/profile').then((res) => authManager.setAuth(res.ok))

root.render(
	<React.StrictMode>
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<AuthProvider manager={authManager}>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
)
