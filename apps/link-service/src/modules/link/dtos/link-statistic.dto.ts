import { LinkStatisticRequest } from '@app/link-rabbitmq-contracts'
import { ApiProperty } from '@nestjs/swagger'

export class LinkStatisticDTO implements LinkStatisticRequest.Response {
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
