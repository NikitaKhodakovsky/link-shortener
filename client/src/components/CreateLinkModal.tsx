import toast from 'react-hot-toast'

import { useCreateLinkMutation } from '../mutations/useCreateLinkMutation'

import { LinkFormValues, LinkModal, linkFormInitialValues } from './LinkModal'
import { ModalProps } from './Modal'

export function CreateLinkModal({ isOpen, closeHandler }: ModalProps) {
	const { mutate } = useCreateLinkMutation()

	const createLink = async (data: LinkFormValues) =>
		mutate(
			{ body: data },
			{
				onSuccess: () => {
					closeHandler()
					toast('Link was successfully created')
				},
				onError: (error) => {
					toast(typeof error.payload === 'object' ? error.payload.message : 'Something went wrong')
				}
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
