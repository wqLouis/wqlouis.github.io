import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide' }),
		sveltekit(),
		tailwindcss()
	],
	server: {
		fs: {
			allow: [resolve(__dirname, 'src'), resolve(__dirname, '.svelte-kit')]
		}
	}
});
