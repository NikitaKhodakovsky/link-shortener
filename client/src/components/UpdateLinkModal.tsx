import toast from 'react-hot-toast'

import { useUpdateLinkMutation } from '../mutations/useUpdateLinkMutation'

import { LinkFormValues, LinkModal } from './LinkModal'
import { ModalProps } from './Modal'

export interface UpdateLinkModalProps extends ModalProps {
	linkId: number
	values: LinkFormValues
}

export function UpdateLinkModal({ closeHandler, isOpen, linkId, values }: UpdateLinkModalProps) {
	const { mutate } = useUpdateLinkMutation()

	const updateLink = async ({ name, destination }: LinkFormValues) => {
		mutate(
			{ body: { name, destination }, pathParams: { linkId } },
			{
				onSuccess: () => {
					closeHandler()
					toast('Link was successfully updated')
				},
				onError: (error) => {
					toast(typeof error.payload === 'object' ? error.payload.message : 'Something went wrong')
				}
			}
		)
	}

	return (
		<LinkModal
			title="Update a link"
			values={values}
			onSubmit={updateLink}
			isOpen={isOpen}
			closeHandler={closeHandler}
			buttonText="Update"
		/>
	)
}
