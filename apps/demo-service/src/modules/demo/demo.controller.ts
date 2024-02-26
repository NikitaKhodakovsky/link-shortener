import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common'
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@app/nestjs-auth-guard'
import { UserId } from '@app/nestjs-utils'

import { DemoService } from './demo.service'
import { DemoDTO } from './demo.dto'

@ApiTags('Demo')
@Controller()
export class DemoController {
	constructor(private readonly demoService: DemoService) {}

	@Post()
	@UseGuards(AuthGuard)
	@ApiException(() => UnauthorizedException)
	@ApiOperation({ description: 'Generates clicks for the provided links' })
	public demo(@UserId() userId: number, @Body() body: DemoDTO) {
		return this.demoService.createClicks(userId, body.linkIds)
	}
}
