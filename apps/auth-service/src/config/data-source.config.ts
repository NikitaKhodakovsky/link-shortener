import { DataSource, DataSourceOptions } from 'typeorm'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from './env'
import { User } from '../modules/user/user.entity'

export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USERNAME,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	entities: [User]
}

export const dataSource = new DataSource(dataSourceOptions)

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
	...dataSourceOptions
}
