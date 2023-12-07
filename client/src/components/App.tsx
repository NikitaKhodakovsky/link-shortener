import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { RequireAuth, WithoutAuth } from '../auth'

import { FallbackPage } from './FallbackPage'
import { RegisterPage } from './RegisterPage'
import { NotFoundPage } from './NotFoundPage'
import { LinksPage } from './LinksPage'
import { LoginPage } from './LoginPage'
import { LinkPage } from './LinkPage'
import { Layout } from './Layout'

export function App() {
	return (
		<div>
			<ErrorBoundary FallbackComponent={FallbackPage} onReset={() => window.location.reload()}>
				<Toaster />
				<Routes>
					<Route element={<Layout />}>
						<Route element={<RequireAuth redirectTo="/login" />}>
							<Route path="/" element={<LinksPage />} />
							<Route path="/links/:id" element={<LinkPage />} />
						</Route>
					</Route>
					<Route element={<WithoutAuth redirectTo="/" />}>
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</ErrorBoundary>
		</div>
	)
}
