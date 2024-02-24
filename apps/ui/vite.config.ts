import browserslistToEsbuild from 'browserslist-to-esbuild'
import tsconfigPaths from 'vite-tsconfig-paths'
import inspect from 'vite-plugin-inspect'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
	plugins: [react(), tsconfigPaths(), svgr({ svgrOptions: { plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'] } }), inspect()],
	build: {
		target: browserslistToEsbuild(),
		assetsInlineLimit: (filePath: string) => !filePath.endsWith('safari-pinned-tab.svg')
	},
	base: process.env.BASE_URL,
	server: {
		port: Number(process.env.PORT)
	},
	resolve: {
		alias: {
			assets: '/src/assets'
		}
	}
})
