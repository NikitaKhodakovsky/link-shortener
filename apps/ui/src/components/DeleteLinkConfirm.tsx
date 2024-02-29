import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import { useDeleteLinkMutation } from '../mutations/useDeleteLinkMutation'
import { toastErrorHandler } from '../utils/toastErrorHandler'
import { useToHome } from '../hooks/useToHome'

import { Modal, ModalProps } from './Modal'

export interface DeleteLinkConfirmProps extends ModalProps {
	linkId: number
}

export function DeleteLinkConfirm({ linkId, isOpen, closeHandler }: DeleteLinkConfirmProps) {
	const { mutateAsync, isPending } = useDeleteLinkMutation()
	const navigate = useNavigate()
	const home = useToHome()

	const deleteLink = () =>
		mutateAsync(
			{ pathParams: { linkId } },
			{
				onSuccess: () => {
					closeHandler()
					navigate(home)
					toast('Link was successfully deleteted')
				},
				onError: toastErrorHandler
			}
		)

	return (
		<Modal title="Confirm deletion of the link" isOpen={isOpen} closeHandler={closeHandler}>
			<p>Information about the link and all related clicks will be deleted. This action cannot be undone. Continue?</p>
			<div className="actions">
				<button className="button transparent" onClick={closeHandler}>
					Cancel
				</button>
				<button className="button red" onClick={deleteLink} disabled={isPending}>
					{isPending ? 'Processing...' : 'Delete'}
				</button>
			</div>
		</Modal>
	)
}
