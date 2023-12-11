import { useSearchParams } from 'react-router-dom'
import { Fragment, useState } from 'react'

import styles from './LinksPage.module.scss'

import { CreateLinkModal } from '../../components/CreateLinkModal'
import { Pagination } from '../../components/Pagination'
import { LinkItem } from '../../components/LinkItem'
import { Loader } from '../../components/Loader'

export function LinksPage() {
	const [searchParams, setSearchParams] = useSearchParams()
	const [page, setPageState] = useState(parseInt(searchParams.get('page') ?? '') || 1)
	const [isOpen, setIsOpen] = useState(false)

	const setPage = (page: number) => {
		setSearchParams({ page: page.toString() })
		setPageState(page)
	}

	return (
		<Fragment>
			<CreateLinkModal isOpen={isOpen} closeHandler={() => setIsOpen(false)} />
			<div className={styles.header}>
				<h1 className="title">Links</h1>
				<button className="button action" onClick={() => setIsOpen(true)}>
					Create Link
				</button>
			</div>
			{/* <Loader /> */}
			{/* <div className='empty'>There are no links</div> */}
			<ul className={styles.linksList}>
				<li>
					<LinkItem animate navState={{ page }} />
				</li>
				<li>
					<LinkItem animate navState={{ page }} />
				</li>

				<li>
					<LinkItem animate navState={{ page }} />
				</li>

				<li>
					<LinkItem animate navState={{ page }} />
				</li>

				<li>
					<LinkItem animate navState={{ page }} />
				</li>
			</ul>
			<Pagination page={page} totalPages={100} setPage={setPage} />
		</Fragment>
	)
}
