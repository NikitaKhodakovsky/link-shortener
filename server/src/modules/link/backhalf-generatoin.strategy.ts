import { generate } from 'randomstring'

export abstract class BackHalfGenerationStrategy {
	abstract generate(): string | Promise<string>
}

export class AlphanumericBackHalfGenerationStrategy extends BackHalfGenerationStrategy {
	public generate(): string {
		return generate({ length: 8, charset: 'alphanumeric' })
	}
}
