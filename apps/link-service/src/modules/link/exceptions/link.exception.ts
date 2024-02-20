import { ConflictException, NotFoundException } from '@nestjs/common'

export class LinkNotFoundException extends NotFoundException {
	constructor() {
		super('Link not found')
	}
}

export class BackHalfIsNotUniqueException extends ConflictException {
	constructor() {
		super('Backhalf is not unique')
	}
}
