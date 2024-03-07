import { Link, useParams } from 'react-router-dom'
import { Fragment, Suspense, lazy } from 'react'

import styles from './LinkPage.module.scss'

import { useLinkStatisticQuery } from 'queries/useLinkStatisticQuery'
import { useFindLinkByIdQuery } from 'queries/useFindLinkByIdQuery'
import { useScrollToTop } from 'hooks/useScrollToTop'
import { LinkItem } from 'components/LinkItem'
import { useToHome } from 'hooks/useToHome'
import { Loader } from 'components/Loader'
import { useTitle } from 'hooks/useTitle'

const Chart = lazy(() => import('components/Chart').then(module => ({ default: module.Chart })))

export function LinkPage() {
	const params = useParams()
	const home = useToHome()

	useScrollToTop()

	const linkId = parseInt(params.linkId ?? '')

	const lq = useFindLinkByIdQuery(linkId)
	const sq = useLinkStatisticQuery(linkId)

	const shortLink = new URL(lq.data?.backhalf ?? '', window.location.origin).href

	const title = lq.isLoading
		? 'Loading...'
		: lq.error && lq.error.status === 404
			? 'Not Found'
			: lq.data?.name ?? 'Something gone wrong...'

	useTitle(`${title} | Link Shortener`)

	return (
		<Fragment>
			<Link to={home} className={styles.button}>
				Links
			</Link>
			<div className={styles.grid}>
				{lq.isError && (
					<div className={`empty ${styles.row}`}>
						{'status' in lq.error && lq.error.status === 404 ? 'Link not found' : 'Something went wrong...'}
					</div>
				)}
				{lq.isPending && <Loader className={styles.row} />}
				{lq.data && (
					<Fragment>
						<LinkItem link={lq.data} className={styles.row} />
						<ul className={`${styles.details} ${styles.row}`}>
							<li>
								<strong>
									<a href={lq.data.destination} target="_blank" rel="noreferrer">
										{lq.data.destination}
									</a>
								</strong>
								<p>Destination</p>
							</li>
							<li>
								<strong>
									<a href={shortLink} target="_blank" rel="noreferrer">
										{shortLink}
									</a>
								</strong>
								<p>Short Link</p>
							</li>
							<li>
								<strong>
									{sq.isLoading && 'Loading...'}
									{sq.data && sq.data.clicks}
								</strong>
								<p>Clicks</p>
							</li>
							<li>
								<strong>{lq.data.backhalf}</strong>
								<p>Back-Half</p>
							</li>
						</ul>
					</Fragment>
				)}
				{sq.isLoading && <Loader className={styles.statisticLoader} />}
				{sq.data && (
					<Suspense fallback={<Loader className={styles.statisticLoader} />}>
						<Chart title="Platforms" data={sq.data.platforms} />
						<Chart title="Browsers" data={sq.data.browsers} />
						<Chart title="Operating Systems" data={sq.data.systems} />
						<Chart title="Devices" data={sq.data.devices} />
					</Suspense>
				)}
			</div>
		</Fragment>
	)
}
