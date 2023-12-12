import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

import './sass/index.scss'

import { AuthManager, AuthProvider } from './auth'

import { App } from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const authManager = new AuthManager()

const queryClient = new QueryClient()

fetch('/auth/profile').then((res) => authManager.setAuth(res.ok))

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<AuthProvider manager={authManager}>
					<App />
				</AuthProvider>
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
)
