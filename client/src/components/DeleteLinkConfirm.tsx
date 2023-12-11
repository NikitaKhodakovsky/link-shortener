import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { Modal, ModalProps } from './Modal'

export interface DeleteLinkConfirmProps extends ModalProps {
	linkId: number
}

export function DeleteLinkConfirm({ linkId, isOpen, closeHandler }: DeleteLinkConfirmProps) {
	const navigate = useNavigate()

	const deleteLink = async () => {
		console.log(`Request to delete link ${linkId}`)

		closeHandler()
		toast('Link was successfully deleteted')
		//TODO: If -1 is our site go back, otherwise navigate to /
		// navigate(-1)
	}

	return (
		<Modal title="Confirm deletion of the link" isOpen={isOpen} closeHandler={closeHandler}>
			<p>
				Information about the link and all related clicks will be deleted. This action cannot be undone.
				Continue?
			</p>
			<div className="actions">
				<button className="button transparent" onClick={closeHandler}>
					Cancel
				</button>
				<button className="button red" onClick={deleteLink}>
					Delete
				</button>
			</div>
		</Modal>
	)
}
