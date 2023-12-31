import { ApiProperty } from '@nestjs/swagger'

export class LinkStatisticDTO {
	@ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
	platforms: Record<string, number>

	@ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
	browsers: Record<string, number>

	@ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
	systems: Record<string, number>

	@ApiProperty({ type: 'object', additionalProperties: { type: 'number' } })
	devices: Record<string, number>

	@ApiProperty()
	clicks: number
}
