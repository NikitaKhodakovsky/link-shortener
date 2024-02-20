import { URL } from 'node:url'

export type URLBuilderOptions = { protocol: string; host: string; port?: number } & Partial<
	Pick<
		URL,
		| 'username' //
		| 'password'
		| 'href'
		| 'pathname'
		| 'search'
		| 'hash'
	>
>

export function createURL({ protocol, host, ...options }: URLBuilderOptions) {
	const url = new URL(`${protocol}://${host}`)

	if (typeof options.port === 'number') {
		url.port = options.port.toString()
	}

	url.username = options.username ?? url.username
	url.password = options.password ?? url.username
	url.href = options.href ?? url.href
	url.pathname = options.pathname ?? url.pathname
	url.search = options.search ?? url.search
	url.hash = options.hash ?? url.hash

	return url.toString()
}
