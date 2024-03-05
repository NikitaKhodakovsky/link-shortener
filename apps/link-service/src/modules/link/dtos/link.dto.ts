import { IsDestinationURL } from '@app/destination-url-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateLinkDTO {
	@IsString()
	@Length(1, 32)
	name: string

	@IsDestinationURL()
	@ApiProperty({ description: 'Url with protocol, host and tld.', example: 'https://google.com' })
	destination: string
}

export class UpdateLinkDTO extends PartialType(CreateLinkDTO) {}
