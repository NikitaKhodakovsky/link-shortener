import { NotFoundException } from '@nestjs/common'

export class LinkNotFoundException extends NotFoundException {
	constructor() {
		super('Link not found')
	}
}
