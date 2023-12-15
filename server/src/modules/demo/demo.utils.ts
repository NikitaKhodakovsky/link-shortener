import { CreateClickArguments } from '../click/click.factory'
import { ClickService } from '../click/click.service'
import { Browser, OS, Platform } from './demo.enums'
import { Click } from '../click/click.entity'
import { Link } from '../link/link.entity'

type Item = Omit<CreateClickArguments, 'link'>

const linux: Item[] = [
	{ os: OS.LINUX, platform: Platform.DESKTOP, browser: Browser.CHROME },
	{ os: OS.LINUX, platform: Platform.DESKTOP, browser: Browser.FIREFOX },
	{ os: OS.LINUX, platform: Platform.DESKTOP, browser: Browser.OPERA }
]

const windows: Item[] = [
	{ os: OS.WINDOWS, platform: Platform.DESKTOP, browser: Browser.CHROME },
	{ os: OS.WINDOWS, platform: Platform.DESKTOP, browser: Browser.FIREFOX },
	{ os: OS.WINDOWS, platform: Platform.DESKTOP, browser: Browser.OPERA },
	{ os: OS.WINDOWS, platform: Platform.DESKTOP, browser: Browser.EDGE }
]

const android: Item[] = [
	{ os: OS.ANDROID, platform: Platform.MOBILE, browser: Browser.CHROME },
	{ os: OS.ANDROID, platform: Platform.MOBILE, browser: Browser.FIREFOX },
	{ os: OS.ANDROID, platform: Platform.MOBILE, browser: Browser.OPERA }
]

const ios: Item[] = [
	{ os: OS.IOS, platform: Platform.MOBILE, browser: Browser.CHROME },
	{ os: OS.IOS, platform: Platform.MOBILE, browser: Browser.FIREFOX },
	{ os: OS.IOS, platform: Platform.MOBILE, browser: Browser.SAFARI },
	{ os: OS.IOS, platform: Platform.MOBILE, browser: Browser.OPERA }
]

const macOS: Item[] = [
	{ os: OS.MACOS, platform: Platform.DESKTOP, browser: Browser.CHROME },
	{ os: OS.MACOS, platform: Platform.DESKTOP, browser: Browser.FIREFOX },
	{ os: OS.MACOS, platform: Platform.DESKTOP, browser: Browser.SAFARI },
	{ os: OS.MACOS, platform: Platform.DESKTOP, browser: Browser.OPERA }
]

const data: Item[] = [...linux, ...windows, ...android, ...ios, ...macOS]

export async function createClicks(link: Link, clickService: ClickService, size?: number) {
	if (typeof size !== 'number') {
		size = Math.round(Math.random() * 100) + 20
	}

	const promises: Promise<Click>[] = []

	for (let i = 0; i < size; i++) {
		const index = Math.round(Math.random() * (data.length - 1))

		const promise = clickService.create({ ...data[index], link })

		promises.push(promise)
	}

	return Promise.allSettled(promises)
}
