import { Module } from '@nestjs/common'

import { LinkRMQController } from './link.controller'
import { ClickModule } from '../click/click.module'

@Module({
	imports: [ClickModule],
	providers: [LinkRMQController]
})
export class LinkModule {}
