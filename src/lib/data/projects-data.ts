import PersonalWebsite from '$lib/assets/others/PersonalWebsite.png';
import TreeRs from '$lib/assets/others/treers.png';
import Depkg from '$lib/assets/others/depkg.png';
import Yawe from '$lib/assets/others/yawe.png';

export interface Project {
	link: string;
	cardTitle: string;
	image?: string;
	tags: string[];
}

export const projects: Project[] = [
	{
		link: 'https://github.com/wqLouis/linux-wallpaperengine',
		cardTitle: 'linux wallpaper engine',
		image: Yawe,
		tags: ['Rust', 'WGPU', 'Vulkan']
	},
	{
		link: 'https://github.com/wqLouis/NeoTV',
		cardTitle: 'NeoTV',
		tags: ['Svelte', 'Mobile', 'Tauri']
	},
	{
		link: 'https://github.com/wqLouis/depkg',
		cardTitle: 'depkg',
		image: Depkg,
		tags: ['Rust']
	},
	{
		link: 'https://github.com/wqLouis/wqlouis.github.io',
		cardTitle: 'wqlouis.github.io',
		image: PersonalWebsite,
		tags: ['Svelte', 'TypeScript', 'Tailwind CSS']
	},
	{
		link: 'https://github.com/wqLouis/bilinovel_cli',
		cardTitle: 'bilinovel cli',
		tags: ['Python', 'Playwright']
	},
	{
		link: 'https://github.com/wqLouis/paper_check',
		cardTitle: 'paper check',
		tags: ['Python', 'Flet']
	},
	{
		link: 'https://github.com/wqLouis/tree-rs',
		cardTitle: 'tree-rs',
		image: TreeRs,
		tags: ['Rust']
	}
];
