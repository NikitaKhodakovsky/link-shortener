import { Click } from './click.entity'

export interface CreateClickArguments {
	userAgent?: string
	platform?: string
	browser?: string
	linkId: number
	date: Date
	os?: string
	device?: string
	country?: string
	region?: string
	city?: string
	ip?: string
}

export function createClick({ userAgent, linkId, date, platform, browser, os, device, country, region, city, ip }: CreateClickArguments) {
	const click = new Click()

	click.linkId = linkId
	click.date = date

	click.userAgent = userAgent ?? null

	click.platform = platform ?? null
	click.browser = browser ?? null
	click.device = device ?? null
	click.os = os ?? null

	click.country = country ?? null
	click.region = region ?? null
	click.city = city ?? null
	click.ip = ip ?? null

	return click
}
