import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { linkStatisticQueryKeyBase } from '../queries/useLinkStatisticQuery'
import { useRegisterMutation } from './useRegisterMutation'
import { CreateLinkDTO } from 'swagger/links/schemas'
import { createLink } from 'swagger/links/components'
import { demo } from 'swagger/demo/components'

export function createDemoLinksData(): CreateLinkDTO[] {
	return [
		{
			name: 'Udemy',
			destination: 'https://udemy.com'
		},
		{
			name: 'DeepL',
			destination: 'https://www.deepl.com'
		},
		{
			name: 'YouTube',
			destination: 'https://youtube.com'
		},
		{
			name: 'Wikipedia',
			destination: 'https://wikipedia.org'
		},
		{
			name: 'Coursera',
			destination: 'https://www.coursera.org'
		},
		{
			name: 'Google Fonts',
			destination: 'https://fonts.google.com'
		},
		{
			name: 'StackOverflow',
			destination: 'https://stackoverflow.com'
		},
		{
			name: 'LinkedIn',
			destination: 'https://linkedin.com/in/khodakovsky'
		},
		{
			name: 'Personal Portfolio',
			destination: 'https://khodakovsky.com'
		},
		{
			name: 'GitHub',
			destination: 'https://github.com/NikitaKhodakovsky'
		},
		{
			name: 'REST Countries',
			destination: 'https://countries.khodakovsky.com'
		}
	]
}

export function useDemoAccountMutation() {
	const register = useRegisterMutation()
	const client = useQueryClient()

	async function mutationFn() {
		const username = window.crypto.randomUUID()
		const password = window.crypto.randomUUID()

		await register.mutateAsync({ body: { username, password } })

		const data = createDemoLinksData()

		const result = await Promise.allSettled(data.map(l => createLink({ body: l })))

		client.invalidateQueries({ queryKey: ['link'] })

		const linkIds: number[] = []

		for (const item of result) {
			item.status === 'fulfilled' && linkIds.push(item.value.id)
		}

		demo({ body: { linkIds } })
			.then(() => {
				toast('Click generation was requested')
				setTimeout(() => client.invalidateQueries({ queryKey: linkStatisticQueryKeyBase }).catch(() => {}), 5000)
			})
			.catch(() => toast('Cannot generate clicks for links'))
	}

	return useMutation({
		mutationFn: mutationFn
	})
}
