export enum ShowSwaggerEnum {
	PRODUCTION = 'production',
	DEVELOPMENT = 'development',
	ALWAYS = 'always',
	NEVER = 'never'
}

export function showSwagger(choice: ShowSwaggerEnum): boolean {
	if (choice === ShowSwaggerEnum.ALWAYS) return true

	if (choice === ShowSwaggerEnum.NEVER) return false

	if (choice === ShowSwaggerEnum.PRODUCTION) {
		return process.env.NODE_ENV === 'production'
	}

	if (choice === ShowSwaggerEnum.DEVELOPMENT) {
		return process.env.NODE_ENV === 'development'
	}

	return false
}
