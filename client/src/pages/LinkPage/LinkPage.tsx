import { Link, createSearchParams, useLocation, useParams } from 'react-router-dom'
import { Fragment } from 'react'

import styles from './LinkPage.module.scss'

import { useFindLinkByIdQuery } from '../../queries/useFindLinkByIdQuery'

import { LinkItem } from '../../components/LinkItem'
import { Loader } from '../../components/Loader'

export function LinkPage() {
	const { state } = useLocation()
	const params = useParams()

	const { data, error, isPending, isError } = useFindLinkByIdQuery(parseInt(params.linkId ?? ''))

	const search = typeof state?.page === 'number' ? createSearchParams({ page: state?.page }).toString() : undefined
	const shortLink = 'https://short-link/aBsCbHd12'
	const clicks = 10232

	return (
		<Fragment>
			<Link to={{ pathname: '/', search }} className={styles.button}>
				Links
			</Link>
			{isPending && <Loader />}
			{isError && error.status === 404 && <div className="empty">Link not found</div>}
			{data && (
				<div className={styles.container}>
					<LinkItem link={data} />
					<ul className={styles.info}>
						<li>
							<strong>
								<a href={data.destination}>{data.destination}</a>
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
							<strong>{clicks}</strong>
							<p>Clicks</p>
						</li>
						<li>
							<strong>{data.backhalf}</strong>
							<p>Back-Half</p>
						</li>
					</ul>
				</div>
			)}
		</Fragment>
	)
}
