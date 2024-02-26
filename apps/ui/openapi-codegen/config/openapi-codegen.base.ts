import { generateFetchers, generateSchemaTypes } from '@openapi-codegen/typescript'
import { Config, Context } from '@openapi-codegen/cli/lib/types'
import { defineConfig } from '@openapi-codegen/cli'
import * as fs from 'node:fs/promises'

/* 
#
# During generation library compiles the configuration file into js file with the same name in the same directory and deletes that file after generation is complete.
#
# To allow parallel generation, I have created symlinks for each namespace pointing to a common configuration file - openapi-codegen.base.ts.
#
*/

export async function generate(context: Context) {
	const filenamePrefix = ' '

	await fs.rm(context.outputDir, { recursive: true }).catch(() => {})

	const { schemasFiles } = await generateSchemaTypes(context, {
		filenamePrefix
	})

	await generateFetchers(context, {
		filenamePrefix,
		schemasFiles
	})

	await context.writeFile('fetcher.ts', "export * from 'src/utils/fetch'")
}

export function createConfig(service: string): Record<string, Config> {
	return {
		[service]: {
			from: {
				relativePath: `./openapi-codegen/swagger/swagger.${service}.yaml`,
				source: 'file'
			},
			outputDir: `./__generated__/${service}`,
			to: generate
		}
	}
}

export default defineConfig({
	...createConfig('auth'),
	...createConfig('links'),
	...createConfig('demo')
})
