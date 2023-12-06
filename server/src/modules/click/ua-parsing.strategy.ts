import Bowser from 'bowser'

export interface ParsedUA {
	platform?: string
	browser?: string
	os?: string
}

export abstract class UAParsingStrategy {
	abstract parse(userAgent: string): ParsedUA | Promise<ParsedUA>
}

export class BowserUAParsingStrategy extends UAParsingStrategy {
	public parse(userAgent: string) {
		try {
			const { platform, browser, os } = Bowser.parse(userAgent)

			return {
				platform: platform.type.toLowerCase(),
				browser: browser.name.toLowerCase(),
				os: os.name.toLowerCase()
			}
		} catch {
			return {}
		}
	}
}
