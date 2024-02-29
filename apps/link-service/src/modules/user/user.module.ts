import { Module } from '@nestjs/common'

import { UserRMQController } from './user.controller'
import { LinkModule } from '../link/link.module'

@Module({
	imports: [LinkModule],
	providers: [UserRMQController]
})
export class UserModule {}
