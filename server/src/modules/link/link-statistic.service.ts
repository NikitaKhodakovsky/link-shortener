import { InjectDataSource } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { LinkStatisticDTO } from './link-statistic.dto'
import { LinkService } from './link.service'

function mapper(array: { key: string; value: string }[]) {
	const result: Record<string, number> = {}

	for (const { key, value } of array) {
		result[key] = +value
	}

	return result
}

@Injectable()
export class LinkStatisticService {
	constructor(
		@InjectDataSource()
		private readonly dataSource: DataSource,
		private readonly linkService: LinkService
	) {}

	public async statistic(userId: number, linkId: number): Promise<LinkStatisticDTO> {
		await this.linkService.findByIdOrFail(userId, linkId)

		const queryRunner = this.dataSource.createQueryRunner()

		await queryRunner.startTransaction('REPEATABLE READ')

		try {
			const browser = await queryRunner.query(
				`SELECT browser AS key, COUNT(*) AS value FROM click WHERE "linkId" = $1 GROUP BY browser`,
				[linkId]
			)

			const platform = await queryRunner.query(
				`SELECT platform AS key, COUNT(*) AS value FROM click WHERE "linkId" = $1 GROUP BY platform`,
				[linkId]
			)

			const devices = await queryRunner.query(
				`SELECT device AS key, COUNT(*) AS value FROM click WHERE "linkId" = $1 GROUP BY device`,
				[linkId]
			)

			const os = await queryRunner.query(
				`SELECT os AS key, COUNT(*) AS value FROM click WHERE "linkId" = $1 GROUP BY os`,
				[linkId]
			)

			return {
				platforms: mapper(platform),
				browsers: mapper(browser),
				devices: mapper(devices),
				systems: mapper(os)
			}
		} finally {
			await queryRunner.rollbackTransaction()
			await queryRunner.release()
		}
	}
}
