import DeviceDetector from 'device-detector-js'
import { Injectable } from '@nestjs/common'

export interface ParsedUA {
	platform?: string
	browser?: string
	device?: string
	os?: string
}

export abstract class UAParsingStrategy {
	abstract parse(userAgent?: string): ParsedUA | Promise<ParsedUA>
}

@Injectable()
export class BasicUAParsingStrategy extends UAParsingStrategy {
	constructor(private readonly deviceDetector: DeviceDetector) {
		super()
	}

	public parse(userAgent: string) {
		const { device, client, os } = this.deviceDetector.parse(userAgent)

		return {
			platform: device.type,
			browser: client.name,
			device: [device.brand, device.model].filter((i) => i).join(' ') || undefined,
			os: os.name
		}
	}
}
