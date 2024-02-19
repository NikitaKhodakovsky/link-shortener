import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { typeOrmModuleOptions } from '../config/data-source.config'
import { ClickModule } from './click/click.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { LinkModule } from './link/link.module'
import { DemoModule } from './demo/demo.module'

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), UserModule, AuthModule, LinkModule, ClickModule, DemoModule]
})
export class AppModule {}
