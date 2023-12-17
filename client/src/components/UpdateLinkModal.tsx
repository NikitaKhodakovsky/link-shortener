import toast from 'react-hot-toast'

import { useUpdateLinkMutation } from '../mutations/useUpdateLinkMutation'
import { toastErrorHandler } from '../utils/toastErrorHandler'

import { LinkFormValues, LinkModal } from './LinkModal'
import { ModalProps } from './Modal'

export interface UpdateLinkModalProps extends ModalProps {
	linkId: number
	values: LinkFormValues
}

export function UpdateLinkModal({ closeHandler, isOpen, linkId, values }: UpdateLinkModalProps) {
	const { mutateAsync } = useUpdateLinkMutation()

	const updateLink = async ({ name, destination }: LinkFormValues) =>
		mutateAsync(
			{ body: { name, destination }, pathParams: { linkId } },
			{
				onSuccess: () => {
					closeHandler()
					toast('Link was successfully updated')
				},
				onError: toastErrorHandler
			}
		)

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
