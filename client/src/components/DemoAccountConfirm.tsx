import { useState } from 'react'

import { useAuth } from '../auth'
import { Modal } from './Modal'

export function DemoAccountConfirm() {
	const [isOpen, setIsOpen] = useState(true)
	const { auth } = useAuth()

	const closeHandler = () => setIsOpen(false)

	const createDemoAccount = async () => {
		//TODO: disable button until request ends
		console.log('..request')
		window.location.reload()
	}

	return (
		<Modal title="For strangers" isOpen={!auth && isOpen} closeHandler={closeHandler}>
			<p>Create a demo account with demo data without registration?</p>
			<div className="actions">
				<button className="button transparent" onClick={closeHandler}>
					Cancel
				</button>
				<button className="button action" onClick={createDemoAccount}>
					Create
				</button>
			</div>
		</Modal>
	)
}
