import { CreateLinkDTO } from '../link/link.dto'

export function createDemoLinks(): CreateLinkDTO[] {
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
			destination: 'https://linkedin.com/khodakovsky'
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
			name: 'Invoice App',
			destination: 'https://invoices.khodakovsky.com'
		},
		{
			name: 'LeetCode',
			destination: 'https://leetcode.com/NikitaKhodakovsky'
		},
		{
			name: 'REST Countries',
			destination: 'https://countries.khodakovsky.com'
		}
	]
}
