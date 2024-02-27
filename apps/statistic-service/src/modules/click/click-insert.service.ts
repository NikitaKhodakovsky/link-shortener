import { BatchProcessor } from '@app/batch-processor'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Click } from './click.entity'

@Injectable()
export class ClickInsertService {
	private readonly batchProcessor = new BatchProcessor<Click>({
		flushStrategy: this.clickRepository.insert.bind(this.clickRepository),
		flushInterval: 1000,
		batchSize: 100
	})

	constructor(
		@InjectRepository(Click)
		private readonly clickRepository: Repository<Click>
	) {}

	public insert(click: Click): Promise<void> {
		return this.batchProcessor.add(click)
	}
}
