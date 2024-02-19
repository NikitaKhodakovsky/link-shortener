import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { RequireAuth, WithoutAuth } from '../auth'

import { FallbackPage, NotFoundPage } from '../pages/FallbackPages'
import { RegisterPage } from '../pages/AuthPages/RegisterPage'
import { DemoAccountConfirm } from './DemoAccountConfirm'
import { LoginPage } from '../pages/AuthPages/LoginPage'
import { ThemeColorMeta } from './ThemeColorMeta'
import { LinksPage } from '../pages/LinksPage'
import { LinkPage } from '../pages/LinkPage'
import { Layout } from './Layout'

export function App() {
	return (
		<div>
			<ErrorBoundary FallbackComponent={FallbackPage} onReset={() => window.location.reload()}>
				<Toaster toastOptions={{ className: 'toast' }} />
				<DemoAccountConfirm />
				<ThemeColorMeta />
				<Routes>
					<Route element={<Layout />}>
						<Route element={<RequireAuth redirectTo="/login" />}>
							<Route path="/" element={<LinksPage />} />
							<Route path="/links/:linkId" element={<LinkPage />} />
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
