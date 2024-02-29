import { Module } from '@nestjs/common'

import { ClickController } from './click.controller'
import { CacheModule } from '../cache/cache.module'
import { ClickService } from './click.service'
import { LinkService } from './link.service'

@Module({
	imports: [CacheModule],
	controllers: [ClickController],
	providers: [ClickService, LinkService]
})
export class ClickModule {}
