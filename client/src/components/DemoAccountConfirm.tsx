import { useEffect } from 'react'

import { useDemoAccountMutation } from '../mutations/useDemoAccountMutation'
import { useIsOpen } from '../hooks/useIsOpen'
import { useAuth } from '../auth'

import { Modal } from './Modal'

export function DemoAccountConfirm() {
	const { isPending, mutate } = useDemoAccountMutation()
	const [isOpen, close, open] = useIsOpen()
	const { auth } = useAuth()

	useEffect(() => {
		const timeout = setTimeout(() => !auth && open(), 2000)

		return () => clearTimeout(timeout)
	}, [])

	const createDemoAccount = () => mutate(undefined, { onSuccess: close })

	return (
		<Modal title="For strangers" isOpen={isOpen} closeHandler={close}>
			<p>Create a demo account with demo data without registration?</p>
			<div className="actions">
				<button className="button transparent" onClick={close}>
					Cancel
				</button>
				<button className="button action" onClick={createDemoAccount}>
					{isPending ? 'Processing...' : 'Create'}
				</button>
			</div>
		</Modal>
	)
}
