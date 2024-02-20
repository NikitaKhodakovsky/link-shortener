import { generate } from 'randomstring'

export class RefreshTokenGenerationStrategy {
	public async generate() {
		return generate({ length: 128, charset: 'alphanumeric' })
	}
}
