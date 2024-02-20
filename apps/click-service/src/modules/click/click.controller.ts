import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { Controller, Get, HttpCode, Param, Req, Res } from '@nestjs/common'
import { ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger'
import { LinkNotFoundException } from '@app/link-exceptions'
import { Request, Response } from 'express'
import { RealIP } from 'nestjs-real-ip'

import { ClickService } from './click.service'
import { LinkService } from './link.service'

@Controller()
export class ClickController {
	constructor(
		private readonly clickService: ClickService,
		private readonly linkService: LinkService
	) {}

	/* Do not register favicon.ico requests as a click  */
	@Get('favicon.ico')
	@HttpCode(404)
	@ApiExcludeEndpoint()
	public async favicon() {}

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
