import { Controller, Post, Session } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { SessionData } from 'express-session'

import { DemoService } from './demo.service'

@ApiTags('Demo')
@Controller('')
export class DemoController {
	constructor(private readonly demoService: DemoService) {}

	@Post('demo')
	@ApiOperation({ description: 'Creates a demo account with demo data' })
	public async demo(@Session() session: SessionData) {
		session.userId = await this.demoService.demo()
	}
}
