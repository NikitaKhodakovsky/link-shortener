import { generateFetchers, generateSchemaTypes } from '@openapi-codegen/typescript'
import { Context } from '@openapi-codegen/cli/lib/types'
import { defineConfig } from '@openapi-codegen/cli'
import fs from 'node:fs/promises'

async function generate(context: Context) {
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

export default defineConfig({
	auth: {
		from: {
			relativePath: './swagger.auth.yaml',
			source: 'file'
		},
		outputDir: './__generated__/auth',
		to: generate
	},
	links: {
		from: {
			relativePath: './swagger.links.yaml',
			source: 'file'
		},
		outputDir: './__generated__/links',
		to: generate
	}
})
