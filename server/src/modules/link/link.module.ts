import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { Link } from './link.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Link])]
})
export class LinkModule {}
