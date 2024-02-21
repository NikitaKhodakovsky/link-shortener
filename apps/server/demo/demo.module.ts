import { Module } from '@nestjs/common'

import { ClickModule } from '../click/click.module'
import { DemoController } from './demo.controller'
import { AuthModule } from '../auth/auth.module'
import { LinkModule } from '../link/link.module'
import { DemoService } from './demo.service'

@Module({
	imports: [AuthModule, LinkModule, ClickModule],
	controllers: [DemoController],
	providers: [DemoService]
})
export class DemoModule {}
