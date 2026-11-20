import PersonalWebsite from '$lib/assets/others/PersonalWebsite.png';
import Depkg from '$lib/assets/others/depkg.png';
import Yawe from '$lib/assets/others/yawe.png';
import KrkrRs from '$lib/assets/gamedev/krkr-rs.svg';

export interface Project {
	link: string;
	cardTitle: string;
	/** one or two lines about the project */
	description: string;
	image?: string;
	tags: string[];
	/** how the preview image fills the card — 'contain' keeps square icons uncropped */
	fit?: 'cover' | 'contain';
}

export const projects: Project[] = [
	{
		link: 'https://github.com/wqLouis/linux-wallpaperengine-gui',
		cardTitle: 'wallpaper engine gui',
		description:
			'A modern GUI manager for linux-wallpaperengine — browse, apply and manage wallpapers.',
		tags: ['Rust', 'Iced', 'Linux']
	},
	{
		link: 'https://github.com/wqLouis/linux-wallpaperengine',
		cardTitle: 'linux wallpaper engine',
		description: 'A wallpaper engine using Vulkan and Metal, with Linux and macOS support.',
		image: Yawe,
		tags: ['Rust', 'WGPU', 'Vulkan']
	},
	{
		link: 'https://github.com/wqLouis/NeoTV',
		cardTitle: 'NeoTV',
		description: 'A free, cross-platform online video search and viewing application.',
		tags: ['Svelte', 'Mobile', 'Tauri']
	},
	{
		link: 'https://github.com/wqLouis/pkg_parser',
		cardTitle: 'depkg',
		description: 'A high-performance parser for the .pkg and .tex files of Wallpaper Engine.',
		image: Depkg,
		tags: ['Rust']
	},
	{
		link: 'https://github.com/wqLouis/wqlouis.github.io',
		cardTitle: 'wqlouis.github.io',
		description: 'This personal website — a Muji-inspired portfolio and blog.',
		image: PersonalWebsite,
		tags: ['Svelte', 'TypeScript', 'Tailwind CSS']
	},
	{
		link: 'https://github.com/wqLouis/bilinovel_cli',
		cardTitle: 'bilinovel cli',
		description: 'A lightweight command line downloader for bilinovel light novels.',
		tags: ['Python', 'Playwright']
	},
	{
		link: 'https://github.com/wqLouis/paper_check',
		cardTitle: 'paper check',
		description: 'A tool for analysing academic examination papers for textual similarities.',
		tags: ['Python', 'Flet']
	},
	{
		link: 'https://github.com/wqLouis/krkr-rs',
		cardTitle: 'krkr-rs',
		description: 'A Rust reimplementation of the KiriKiri2 (TVP) engine, for Linux and Android.',
		image: KrkrRs,
		fit: 'contain',
		tags: ['Rust', 'Vulkan', 'KiriKiri2']
	}
];
