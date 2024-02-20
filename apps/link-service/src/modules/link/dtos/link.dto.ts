import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString, IsUrl, Length } from 'class-validator'

export class CreateLinkDTO {
	@IsString()
	@Length(1, 32)
	name: string

	@IsUrl({ protocols: ['http', 'https'], require_tld: true, require_host: true, require_protocol: true })
	@ApiProperty({ description: 'Url with protocol, host and tld.', example: 'https://google.com' })
	destination: string
}

export class UpdateLinkDTO extends PartialType(CreateLinkDTO) {}
