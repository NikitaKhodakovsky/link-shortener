import { useEffect } from 'react'

import { useIsOpen } from '../hooks/useIsOpen'
import { useAuth } from '../auth'

import { Modal } from './Modal'

export function DemoAccountConfirm() {
	const [isOpen, close, open] = useIsOpen()
	const { auth } = useAuth()

	useEffect(() => {
		const timeout = setTimeout(() => !auth && open(), 1500)

		return () => clearTimeout(timeout)
	}, [])

	const createDemoAccount = async () => {
		//TODO: disable button until request ends
		console.log('..request')
		window.location.reload()
	}

	return (
		<Modal title="For strangers" isOpen={isOpen} closeHandler={close}>
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
