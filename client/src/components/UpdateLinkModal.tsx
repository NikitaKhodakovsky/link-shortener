import toast from 'react-hot-toast'

import { LinkFormValues, LinkModal } from './LinkModal'
import { ModalProps } from './Modal'

export interface UpdateLinkModalProps extends ModalProps {
	linkId: number
	values: LinkFormValues
}

export function UpdateLinkModal({ closeHandler, isOpen, linkId, values }: UpdateLinkModalProps) {
	const updateLink = async (data: LinkFormValues) => {
		console.log('Updating a link...', linkId, data)
		toast('Link was successfully updated')
		closeHandler()
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
