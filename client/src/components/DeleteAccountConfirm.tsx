import toast from 'react-hot-toast'

import { useDeleteAccountMutation } from '../mutations/useDeleteAccountMutation'
import { Modal, ModalProps } from './Modal'

export function DeleteAccountConfirm({ isOpen, closeHandler }: ModalProps) {
	const { mutate } = useDeleteAccountMutation()

	const deleteAccountHandler = () => {
		mutate(undefined, {
			onSuccess: () => {
				closeHandler()
				toast('Your account was successfully deleted')
			}
		})
	}

	return (
		<Modal title="Confirm deletion of the link" isOpen={isOpen} closeHandler={closeHandler}>
			<p>Your account and all your links will be deleted. This action cannot be undone. Continue?</p>
			<div className="actions">
				<button className="button transparent" onClick={closeHandler}>
					Cancel
				</button>
				<button className="button red" onClick={deleteAccountHandler}>
					Delete
				</button>
			</div>
		</Modal>
	)
}
