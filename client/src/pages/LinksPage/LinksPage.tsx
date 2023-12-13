import { useSearchParams } from 'react-router-dom'
import { Fragment, useState } from 'react'

import styles from './LinksPage.module.scss'

import { useAllLinksQuery } from '../../queries/useAllLinksQuery'

import { useIsOpen } from '../../hooks/useIsOpen'

import { CreateLinkModal } from '../../components/CreateLinkModal'
import { Pagination } from '../../components/Pagination'
import { LinkItem } from '../../components/LinkItem'
import { Loader } from '../../components/Loader'

export function LinksPage() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPageState] = useState(parseInt(searchParams.get('page') ?? '') || 1)
	const [isOpen, close, open] = useIsOpen()

	const { data, isPending, isError, error } = useAllLinksQuery(page, 2)

	const setPage = (page: number) => {
		setSearchParams({ page: page.toString() })
		setPageState(page)
	}

	return (
		<Fragment>
			<CreateLinkModal isOpen={isOpen} closeHandler={close} />
			<div className={styles.header}>
				<h1 className="title">Links</h1>
				<button className="button action" onClick={open}>
					Create Link
				</button>
			</div>
			{isPending && <Loader />}
			{data && data.items.length === 0 && <div className="empty">There are no links</div>}
			{data && data.items.length !== 0 && (
				<Fragment>
					<ul className={styles.linksList}>
						{data.items.map((link) => (
							<li>
								<LinkItem animate link={link} navState={{ page }} />
							</li>
						))}
					</ul>
					<Pagination page={page} totalPages={data.meta.totalPages} setPage={setPage} />
				</Fragment>
			)}
		</Fragment>
	)
}
