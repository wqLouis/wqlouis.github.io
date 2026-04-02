import type { PageLoad } from './$types';

interface BlogMetadata {
	title?: string;
	date?: string;
	description?: string;
	tags?: string[];
}

interface BlogModule {
	metadata?: BlogMetadata;
}

export const load: PageLoad = async () => {
	// Import all markdown files under src/routes/blogs/[slug]/+page.md
	const modules = import.meta.glob('./*/+page.md', {
		eager: true
	});

	const blogs = Object.entries(modules).map(([path, module]) => {
		// Extract slug from path: ./[slug]/+page.md
		const slug = path.split('/')[1];

		// Get metadata from mdsvex
		const metadata = (module as BlogModule).metadata || {};

		return {
			slug,
			title: metadata.title || 'Untitled',
			description: metadata.description || '',
			date: metadata.date || '',
			tags: metadata.tags || []
		};
	});

	// Sort by date descending (newest first)
	blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		blogs
	};
};
