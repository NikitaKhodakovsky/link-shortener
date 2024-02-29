import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { Controller, Get, HttpCode, Param, Req, Res } from '@nestjs/common'
import { LinkNotFoundException } from '@app/link-exceptions'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { RealIP } from 'nestjs-real-ip'

import { ClickService } from './click.service'
import { LinkService } from './link.service'

@Controller()
@ApiTags('Click')
export class ClickController {
	constructor(
		private readonly clickService: ClickService,
		private readonly linkService: LinkService
	) {}

	@Get('/:backhalf')
	@HttpCode(301)
	@ApiException(() => LinkNotFoundException)
	@ApiResponse({ status: 301, description: 'Redirect to links destination.' })
	public async click(@Param('backhalf') backhalf: string, @Req() req: Request, @RealIP() ip: string, @Res() res: Response) {
		const { linkId, destination } = await this.linkService.findOneByBackhalf(backhalf)

		const userAgent = req.headers['user-agent']

		await this.clickService.create({ linkId, userAgent, ip })

		res.redirect(destination)
	}
}
