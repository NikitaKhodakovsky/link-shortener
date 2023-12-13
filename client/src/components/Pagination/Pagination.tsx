import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

export interface PaginationProps {
	page: number
	totalPages: number
	setPage: (page: number) => any
}

export function Pagination({ page, totalPages, setPage }: PaginationProps) {
	return (
		<ReactPaginate
			pageCount={totalPages}
			forcePage={page - 1}
			marginPagesDisplayed={1}
			pageRangeDisplayed={4}
			onPageChange={({ selected }) => setPage(selected + 1)}
			containerClassName={styles.container}
			breakLinkClassName={styles.item}
			pageLinkClassName={styles.item}
			activeLinkClassName={styles.current}
			previousLinkClassName={styles.item}
			nextLinkClassName={styles.item}
			disabledLinkClassName={styles.disabled}
			previousLabel="<"
			nextLabel=">"
		/>
	)
}
