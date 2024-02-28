import { Module } from '@nestjs/common'

import { HealthModule } from './health/health.module'
import { ClickModule } from './click/click.module'
import { CacheModule } from './cache/cache.module'

@Module({
	imports: [HealthModule, ClickModule, CacheModule]
})
export class AppModule {}
