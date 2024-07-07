import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	resolve: {
		alias: {
			'next/image': path.resolve(
				__dirname,
				'./.ginger-book/UnoptimizedImage.tsx'
			),
			'next/link': path.resolve(__dirname, './.ginger-book/UnoptimizedLink.tsx')
		}
	}
})
