import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import { Fragment } from 'react'

import styles from './LinksPage.module.scss'

import { useAllLinksQuery } from '../../queries/useAllLinksQuery'
import { useIsOpen } from '../../hooks/useIsOpen'

import { CreateLinkModal } from '../../components/CreateLinkModal'
import { Pagination } from '../../components/Pagination'
import { LinkItem } from '../../components/LinkItem'
import { Loader } from '../../components/Loader'

export function LinksPage() {
	const [isOpen, close, open] = useIsOpen()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const page = parseInt(searchParams.get('page') ?? '') || 1

	const { data, isPending, isError } = useAllLinksQuery(page, 8)

	const setPage = (page: number) =>
		navigate({ pathname: '/', search: createSearchParams({ page: page.toString() }).toString() }, { state: { page } })

	return (
		<div className={styles.wrap}>
			<CreateLinkModal isOpen={isOpen} closeHandler={close} />
			<div className={styles.header}>
				<h1 className="title">Links</h1>
				<button className="button action" onClick={open}>
					Create Link
				</button>
			</div>
			{isPending && <Loader />}
			{isError && <div className="empty">Something went wrong...</div>}
			{data && data.items.length === 0 && <div className="empty">There are no links</div>}
			{data && data.meta.totalPages !== 0 && (
				<Fragment>
					<ul className={styles.linksList}>
						{data.items.map(link => (
							<li>
								<LinkItem animate link={link} navState={{ page }} />
							</li>
						))}
					</ul>
					<Pagination page={page} totalPages={data.meta.totalPages} setPage={setPage} />
				</Fragment>
			)}
		</div>
	)
}
