import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate'
import { LinkNotFoundException } from '@app/link-exceptions'
import { AuthGuard } from '@app/nestjs-auth-guard'
import { UserId } from '@app/nestjs-utils'
import { ApiTags } from '@nestjs/swagger'
import {
	UnauthorizedException,
	BadRequestException,
	HttpStatus,
	Controller,
	UseGuards,
	HttpCode,
	Delete,
	Param,
	Query,
	Patch,
	Body,
	Post,
	Get
} from '@nestjs/common'

import { CreateLinkDTO, LinkStatisticDTO, PaginatedQuery, UpdateLinkDTO } from '../dtos'
import { LinkService, LinkStatisticService } from '../services'
import { BackHalfIsNotUniqueException } from '../exceptions'
import { ApiOkPaginatedResponse } from '../decorators'
import { Link } from '../entities'

@ApiTags('Links')
@Controller('links')
export class LinkController {
	constructor(
		private readonly linkStatisticService: LinkStatisticService,
		private readonly linkService: LinkService
	) {}

	@Post()
	@UseGuards(AuthGuard)
	@ApiException(() => [BadRequestException, UnauthorizedException, BackHalfIsNotUniqueException])
	public createLink(@UserId() userId: number, @Body() data: CreateLinkDTO): Promise<Link> {
		return this.linkService.create(userId, data)
	}

	@Patch(':linkId')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiException(() => [BadRequestException, UnauthorizedException, LinkNotFoundException])
	public updateLink(@UserId() userId: number, @Param('linkId') linkId: number, @Body() data: UpdateLinkDTO): Promise<Link> {
		return this.linkService.update(userId, linkId, data)
	}

	@Delete(':linkId')
	@UseGuards(AuthGuard)
	@ApiException(() => [BadRequestException, UnauthorizedException, LinkNotFoundException])
	public deleteLink(@UserId() userId: number, @Param('linkId') linkId: number): Promise<void> {
		return this.linkService.delete(userId, linkId)
	}

	@Get(':linkId')
	@UseGuards(AuthGuard)
	@ApiException(() => [BadRequestException, UnauthorizedException, LinkNotFoundException])
	public findLinkById(@UserId() userId: number, @Param('linkId') linkId: number): Promise<Link> {
		return this.linkService.findByIdOrFail(userId, linkId)
	}

	@Get()
	@UseGuards(AuthGuard)
	@ApiOkPaginatedResponse(Link)
	@ApiException(() => [BadRequestException, UnauthorizedException])
	public findAllLinks(@UserId() userId: number, @Query() { page, perPage }: PaginatedQuery): Promise<Pagination<Link, IPaginationMeta>> {
		return this.linkService.findAll(userId, page, perPage)
	}

	@Get(':linkId/statistic')
	@UseGuards(AuthGuard)
	@ApiException(() => [BadRequestException, UnauthorizedException, LinkNotFoundException])
	public linkStatistic(@UserId() userId: number, @Param('linkId') linkId: number): Promise<LinkStatisticDTO> {
		return this.linkStatisticService.statistic(userId, linkId)
	}
}
