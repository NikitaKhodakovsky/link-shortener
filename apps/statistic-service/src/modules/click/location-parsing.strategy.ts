export interface ILocation {
	country?: string
	region?: string
	city?: string
	ip?: string
}

export abstract class LocationParsingStrategy {
	abstract parse(ip: string): ILocation | Promise<ILocation>
}

export class NotImplementedLocationParsingStrategy extends LocationParsingStrategy {
	public async parse(ip: string) {
		return { ip }
	}
}
