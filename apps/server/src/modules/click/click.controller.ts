import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { Controller, Get, HttpCode, Param, Req, Res } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { RealIP } from 'nestjs-real-ip'

import { LocationParsingStrategy } from './location-parsing.strategy'
import { LinkNotFoundException } from '../link/link.exception'
import { UAParsingStrategy } from './ua-parsing.strategy'
import { LinkService } from '../link/link.service'
import { ClickService } from './click.service'

@ApiTags('Click')
@Controller()
export class ClickController {
	constructor(
		private readonly locationParsingStrategy: LocationParsingStrategy,
		private readonly uaParsingStrategy: UAParsingStrategy,
		private readonly clickService: ClickService,
		private readonly linkService: LinkService
	) {}

	@Get(':backHalf')
	@HttpCode(301)
	@ApiException(() => LinkNotFoundException)
	@ApiResponse({ status: 301, description: 'Redirect to links destination.' })
	public async click(
		@Param('backHalf') backHalf: string,
		@Req() req: Request,
		@Res() res: Response,
		@RealIP() ip: string
	) {
		const link = await this.linkService.findByBackHalfOrFail(backHalf)

		const userAgent = req.headers['user-agent']
		const parsedUA = await this.uaParsingStrategy.parse(userAgent)
		const location = await this.locationParsingStrategy.parse(ip)

		await this.clickService.create({ link, userAgent, ...parsedUA, ...location })

		res.redirect(link.destination)
	}
}
