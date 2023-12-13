import { useIsOpen } from '../hooks/useIsOpen'
import { useAuth } from '../auth'

import { Modal } from './Modal'

export function DemoAccountConfirm() {
	const [isOpen, close] = useIsOpen()
	const { auth } = useAuth()

	const createDemoAccount = async () => {
		//TODO: disable button until request ends
		console.log('..request')
		window.location.reload()
	}

	return (
		<Modal title="For strangers" isOpen={!auth && isOpen} closeHandler={close}>
			<p>Create a demo account with demo data without registration?</p>
			<div className="actions">
				<button className="button transparent" onClick={close}>
					Cancel
				</button>
				<button className="button action" onClick={createDemoAccount}>
					Create
				</button>
			</div>
		</Modal>
	)
}
