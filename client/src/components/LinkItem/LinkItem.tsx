import { Link } from 'react-router-dom'
import { Fragment } from 'react'

import styles from './LinkItem.module.scss'

import { Link as ILink } from '../../__generated__/apiSchemas'

import { formatDate } from '../../utils/formatDate'
import { useIsOpen } from '../../hooks/useIsOpen'

import { DeleteLinkConfirm } from '../DeleteLinkConfirm'
import { UpdateLinkModal } from '../UpdateLinkModal'

export interface LinkItemProps {
	link: ILink
	animate?: boolean
	navState?: any
	className?: string
}

export function LinkItem({ link, animate = false, navState, className }: LinkItemProps) {
	const [deleteLinkConfirm, closeDeleteLinkConfirm, openDeleteLinkConfirm] = useIsOpen()
	const [updateLinkModal, closeUpdateLinkModal, openUpdateLinkModal] = useIsOpen()
	const { id, createdAt, name, destination } = link

	return (
		<Fragment>
			<UpdateLinkModal
				linkId={id}
				isOpen={updateLinkModal}
				closeHandler={closeUpdateLinkModal}
				values={{ name, destination }}
			/>
			<DeleteLinkConfirm linkId={id} isOpen={deleteLinkConfirm} closeHandler={closeDeleteLinkConfirm} />
			<div className={`${styles.linkItem} ${className ?? ''} ${animate ? styles.animate : ''}`}>
				<Link to={`/links/${id}`} className={styles.content} state={navState}>
					<strong>{name}</strong>
					<p>{formatDate(createdAt)}</p>
				</Link>
				<div className={styles.actions}>
					<button className="icon edit" onClick={openUpdateLinkModal} />
					<button className="icon delete" onClick={openDeleteLinkConfirm} />
				</div>
			</div>
		</Fragment>
	)
}
