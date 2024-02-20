import { Module } from '@nestjs/common'

import { ClickModule } from './click/click.module'
import { CacheModule } from './cache/cache.module'

@Module({
	imports: [ClickModule, CacheModule]
})
export class AppModule {}
