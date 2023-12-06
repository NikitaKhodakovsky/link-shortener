import { Link } from '../link/link.entity'
import { Click } from './click.entity'

export interface CreateClickArguments {
	platform?: string
	browser?: string
	link: Link
	os?: string
	country?: string
	region?: string
	city?: string
	ip?: string
}

export function createClick({ link, platform, browser, os, country, region, city, ip }: CreateClickArguments) {
	const click = new Click()

	click.link = link

	click.platform = platform ?? null
	click.browser = browser ?? null
	click.os = os ?? null

	click.country = country ?? null
	click.region = region ?? null
	click.city = city ?? null
	click.ip = ip ?? null

	return click
}
