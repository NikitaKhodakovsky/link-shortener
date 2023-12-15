import { Link, useParams } from 'react-router-dom'
import { Fragment } from 'react'

import styles from './LinkPage.module.scss'

import { useLinkStatisticQuery } from '../../queries/useLinkStatisticQuery'
import { useFindLinkByIdQuery } from '../../queries/useFindLinkByIdQuery'
import { useToHome } from '../../hooks/useToHome'

import { LinkItem } from '../../components/LinkItem'
import { Loader } from '../../components/Loader'
import { Chart } from '../../components/Chart'

export function LinkPage() {
	const params = useParams()
	const home = useToHome()

	const linkId = parseInt(params.linkId ?? '')

	const lq = useFindLinkByIdQuery(linkId)
	const sq = useLinkStatisticQuery(linkId)

	const shortLink = new URL(lq.data?.backhalf ?? '', window.location.origin).href

	return (
		<Fragment>
			<Link to={home} className={styles.button}>
				Links
			</Link>
			<div className={styles.grid}>
				{lq.isError && lq.error.status === 404 && <div className={`empty ${styles.row}`}>Link not found</div>}
				{lq.isPending && <Loader className={styles.row} />}
				{lq.data && (
					<Fragment>
						<LinkItem link={lq.data} className={styles.row} />
						<ul className={`${styles.details} ${styles.row}`}>
							<li>
								<strong>
									<a href={lq.data.destination} target="_blank">
										{lq.data.destination}
									</a>
								</strong>
								<p>Destination</p>
							</li>
							<li>
								<strong>
									<a href={shortLink} target="_blank">
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
					<Fragment>
						<Chart title="Platforms" data={sq.data.platforms} />
						<Chart title="Browsers" data={sq.data.browsers} />
						<Chart title="Operating Systems" data={sq.data.systems} />
						<Chart title="Devices" data={sq.data.devices} />
					</Fragment>
				)}
			</div>
		</Fragment>
	)
}
