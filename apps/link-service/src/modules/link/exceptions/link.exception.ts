import { ConflictException } from '@nestjs/common'

export class BackHalfIsNotUniqueException extends ConflictException {
	constructor() {
		super('Backhalf is not unique')
	}
}
