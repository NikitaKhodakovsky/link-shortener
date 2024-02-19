import toast from 'react-hot-toast'

import { useDeleteAccountMutation } from '../mutations/useDeleteAccountMutation'
import { toastErrorHandler } from '../utils/toastErrorHandler'

import { Modal, ModalProps } from './Modal'

export function DeleteAccountConfirm({ isOpen, closeHandler }: ModalProps) {
	const { mutateAsync, isPending } = useDeleteAccountMutation()

	const deleteAccountHandler = () =>
		mutateAsync(undefined, {
			onSuccess: () => {
				closeHandler()
				toast('Your account was successfully deleted')
			},
			onError: toastErrorHandler
		})

	return (
		<Modal title="Confirm account deletion" isOpen={isOpen} closeHandler={closeHandler}>
			<p>Your account and all your links will be deleted. This action cannot be undone. Continue?</p>
			<div className="actions">
				<button className="button transparent" onClick={closeHandler}>
					Cancel
				</button>
				<button className="button red" onClick={deleteAccountHandler} disabled={isPending}>
					{isPending ? 'Processing...' : 'Delete'}
				</button>
			</div>
		</Modal>
	)
}
