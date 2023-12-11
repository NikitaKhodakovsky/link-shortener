import { Link, createSearchParams, useLocation, useParams } from 'react-router-dom'
import { Fragment } from 'react'

import styles from './LinkPage.module.scss'

import { LinkItem } from '../../components/LinkItem'
import { Loader } from '../../components/Loader'

export function LinkPage() {
	const { state } = useLocation()
	const params = useParams()

	const linkId = parseInt(params.linkId || '')

	const destination = 'https://khodakovsky.com'
	const shortLink = 'https://short-link/aBsCbHd12'
	const name = 'Personal Portfolio'

	const search = typeof state?.page === 'number' ? createSearchParams({ page: state?.page }).toString() : undefined

	return (
		<Fragment>
			<Link to={{ pathname: '/', search }} className={styles.button}>
				Links
			</Link>
			{/* <Loader /> */}
			{/* <div className='empty'>Link not found</div> */}
			<div className={styles.container}>
				<LinkItem />
				<ul className={styles.info}>
					<li>
						<strong>
							<a href={destination}>{destination}</a>
						</strong>
						<p>Destination</p>
					</li>
					<li>
						<strong>
							<a href={shortLink}>{shortLink}</a>
						</strong>
						<p>Short Link</p>
					</li>
					<li>
						<strong>9912</strong>
						<p>Clicks</p>
					</li>
					<li>
						<strong>aBsCbHd12</strong>
						<p>Back-Half</p>
					</li>
				</ul>
			</div>
		</Fragment>
	)
}
