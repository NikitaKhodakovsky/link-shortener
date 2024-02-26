import { IsPositive } from 'class-validator'

export class DemoDTO {
	@IsPositive({ each: true })
	linkIds: number[]
}
