import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { ApiTags } from '@nestjs/swagger'
import {
	UnauthorizedException,
	BadRequestException,
	HttpStatus,
	Controller,
	HttpCode,
	Delete,
	Param,
	Body,
	Get,
	Post,
	Query
} from '@nestjs/common'

import { ApiOkPaginatedResponse } from '../../common/api-ok-paginated-response.decorator'
import { BackHalfIsNotUniqueException, LinkNotFoundException } from './link.exception'
import { PaginatedQuery } from '../../common/paginated.query'
import { CreateLinkDTO, UpdateLinkDTO } from './link.dto'
import { UserId } from '../../common/user-id.decorator'
import { LinkService } from './link.service'
import { Link } from './link.entity'

@ApiTags('Links')
@Controller('links')
export class LinkController {
	constructor(private readonly linkService: LinkService) {}

	@Post()
	@ApiException(() => [BadRequestException, UnauthorizedException, BackHalfIsNotUniqueException])
	public create(@UserId() userId: number, @Body() data: CreateLinkDTO) {
		return this.linkService.create(userId, data)
	}

	@Post(':linkId')
	@HttpCode(HttpStatus.OK)
	@ApiException(() => [BadRequestException, UnauthorizedException, LinkNotFoundException])
	public update(@UserId() userId: number, @Param('linkId') linkId: number, @Body() data: UpdateLinkDTO) {
		return this.linkService.update(userId, linkId, data)
	}

	@Delete(':linkId')
	@ApiException(() => [BadRequestException, UnauthorizedException, LinkNotFoundException])
	public delete(@UserId() userId: number, @Param('linkId') linkId: number) {
		return this.linkService.delete(userId, linkId)
	}

	@Get(':linkId')
	@ApiException(() => [BadRequestException, UnauthorizedException, LinkNotFoundException])
	public findById(@UserId() userId: number, @Param('linkId') linkId: number) {
		return this.linkService.findByIdOrFail(userId, linkId)
	}

	@Get()
	@ApiOkPaginatedResponse(Link)
	@ApiException(() => [BadRequestException, UnauthorizedException])
	public findAll(@UserId() userId: number, @Query() { page, perPage }: PaginatedQuery) {
		return this.linkService.findAll(userId, page, perPage)
	}
}
