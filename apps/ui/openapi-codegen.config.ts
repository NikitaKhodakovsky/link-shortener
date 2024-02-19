import { generateFetchers, generateSchemaTypes } from '@openapi-codegen/typescript'
import { defineConfig } from '@openapi-codegen/cli'
export default defineConfig({
	api: {
		from: {
			relativePath: './swagger.yaml',
			source: 'file'
		},
		outputDir: 'src/__generated__',
		to: async (context) => {
			const filenamePrefix = 'api'
			const { schemasFiles } = await generateSchemaTypes(context, {
				filenamePrefix
			})
			await generateFetchers(context, {
				filenamePrefix,
				schemasFiles
			})
		}
	}
})
