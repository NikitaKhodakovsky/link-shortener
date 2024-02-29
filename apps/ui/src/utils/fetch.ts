export class HTTPError extends Error {
	constructor(
		public readonly status: number,
		public readonly statusText: string
	) {
		super()
		this.message = `HTTP Error: ${status} ${statusText}`
	}
}

export type ErrorWrapper<TError> = TError | Error

export type PathParams = Record<string | number, string | number>

export type QueryParams = Record<string | number, string | number | (string | number)[]>

export type ApiFetcherOptions<TBody, THeaders, TQueryParams extends QueryParams, TPathParams extends PathParams> = {
	url: string
	method: string
	body?: TBody
	headers?: THeaders
	queryParams?: TQueryParams
	pathParams?: TPathParams
	signal?: AbortSignal
}

export async function fetch<
	TData,
	TError,
	TBody extends object | undefined | null,
	THeaders extends object,
	TQueryParams extends QueryParams,
	TPathParams extends PathParams
>({
	url,
	method,
	body,
	headers,
	pathParams,
	queryParams,
	signal
}: ApiFetcherOptions<TBody, THeaders, TQueryParams, TPathParams>): Promise<TData> {
	const requestHeaders: HeadersInit = {
		'Content-Type': 'application/json',
		...headers
	}
	const response = await window
		.fetch(createURL(baseURL, url, pathParams, queryParams), {
			method: method.toUpperCase(),
			body: body && JSON.stringify(body),
			headers: requestHeaders,
			signal
		})
		.catch(e => {
			throw new Error(`Network error: ${e}`)
		})

	const contentType = response.headers.get('content-type') ?? ''

	if (contentType.includes('json')) {
		const payload = await response.json().catch((e: any) => {
			throw new Error(`Invalid payload: ${e}`)
		})

		if (!response.ok) throw payload as TError

		return payload as TData
	} else {
		if (!response.ok) throw new HTTPError(response.status, response.statusText)

		return null as TData
	}
}

const baseURL = window.location.origin

export function createURL(baseURL: string, path: string, pathParams: PathParams = {}, queryParams: QueryParams = {}): string {
	const xPath = Object.keys(pathParams).reduce((path, param) => path.replace(`{${param}}`, `${pathParams[param]}`), path)

	const query: string[] = []

	for (const key in queryParams) {
		const value = queryParams[key]

		query.push(`${key}=${Array.isArray(value) ? value.join(',') : value}`)
	}

	const url = new URL(xPath, baseURL)

	url.search = query.join('&')

	return url.toString()
}
