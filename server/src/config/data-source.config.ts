import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from './env'

export const dataSourceConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	autoLoadEntities: true,
	synchronize: true
}
