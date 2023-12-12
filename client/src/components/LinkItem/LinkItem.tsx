import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './LinkItem.module.scss'

import { DeleteLinkConfirm } from '../DeleteLinkConfirm'
import { UpdateLinkModal } from '../UpdateLinkModal'

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
	const [deleteLinkConfirm, setDeleteLinkConfirm] = useState(false)
	const [updateLinkModal, setUpdateLinkModal] = useState(false)
	const { id, createdAt, name, destination } = link

	return (
		<Fragment>
			<UpdateLinkModal
				linkId={id}
				isOpen={updateLinkModal}
				closeHandler={() => setUpdateLinkModal(false)}
				values={{ name, destination }}
			/>
			<DeleteLinkConfirm
				linkId={id}
				isOpen={deleteLinkConfirm}
				closeHandler={() => setDeleteLinkConfirm(false)}
			/>
			<div className={`${styles.linkItem} ${animate ? styles.animate : ''}`}>
				<Link to={`/links/${id}`} className={styles.content} state={navState}>
					<strong>{name}</strong>
					<p>{createdAt}</p>
				</Link>
				<div className={styles.actions}>
					<button />
					<button onClick={() => setUpdateLinkModal(true)} />
					<button onClick={() => setDeleteLinkConfirm(true)} />
				</div>
			</div>
		</Fragment>
	)
}
