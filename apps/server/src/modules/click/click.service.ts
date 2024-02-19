import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { CreateClickArguments, createClick } from './click.factory'
import { Click } from './click.entity'

@Injectable()
export class ClickService {
	constructor(
		@InjectRepository(Click)
		private readonly clickRepository: Repository<Click>
	) {}

	public async create(data: CreateClickArguments) {
		const click = createClick(data)
		return this.clickRepository.save(click)
	}
}
