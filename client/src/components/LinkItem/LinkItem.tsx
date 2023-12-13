import { Link } from 'react-router-dom'
import { Fragment } from 'react'

import styles from './LinkItem.module.scss'

import { useIsOpen } from '../../hooks/useIsOpen'

import { DeleteLinkConfirm } from '../DeleteLinkConfirm'
import { UpdateLinkModal } from '../UpdateLinkModal'

//TODO
export interface ILink {
	id: number
	name: string
	createdAt: string
	destination: string
}

export interface LinkItemProps {
	link: ILink
	animate?: boolean
	navState?: any
}

export function LinkItem({ link, animate = false, navState }: LinkItemProps) {
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
			<div className={`${styles.linkItem} ${animate ? styles.animate : ''}`}>
				<Link to={`/links/${id}`} className={styles.content} state={navState}>
					<strong>{name}</strong>
					<p>{createdAt}</p>
				</Link>
				<div className={styles.actions}>
					<button />
					<button onClick={openUpdateLinkModal} />
					<button onClick={openDeleteLinkConfirm} />
				</div>
			</div>
		</Fragment>
	)
}
