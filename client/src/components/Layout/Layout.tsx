import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../Header'

export function Layout() {
	return (
		<Fragment>
			<Header />
			<div className="container">
				<Outlet />
			</div>
		</Fragment>
	)
}
