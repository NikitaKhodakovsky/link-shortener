import toast from 'react-hot-toast'

import { useCreateLinkMutation } from '../mutations/useCreateLinkMutation'

import { toastErrorHandler } from '../utils/toastErrorHandler'

import { LinkFormValues, LinkModal, linkFormInitialValues } from './LinkModal'
import { ModalProps } from './Modal'

export function CreateLinkModal({ isOpen, closeHandler }: ModalProps) {
	const { mutateAsync } = useCreateLinkMutation()

	const createLink = (data: LinkFormValues) =>
		mutateAsync(
			{ body: data },
			{
				onSuccess: () => {
					closeHandler()
					toast('Link was successfully created')
				},
				onError: toastErrorHandler
			}
		)

	return (
		<LinkModal
			title="Create a link"
			values={linkFormInitialValues}
			onSubmit={createLink}
			isOpen={isOpen}
			closeHandler={closeHandler}
			buttonText="Create"
		/>
	)
}
