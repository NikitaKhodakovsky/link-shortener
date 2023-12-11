import toast from 'react-hot-toast'

import { LinkFormValues, LinkModal, linkFormInitialValues } from './LinkModal'
import { ModalProps } from './Modal'

export function CreateLinkModal({ isOpen, closeHandler }: ModalProps) {
	const createLink = async (data: LinkFormValues) => {
		console.log('Creating a link...', data)
		toast('Link was successfully created')
		closeHandler()
	}

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
