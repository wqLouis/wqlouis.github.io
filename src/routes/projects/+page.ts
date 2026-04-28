export interface ProjectPage {
	slug: string;
	title: string;
	description: string;
	tags: string[];
}

export const load = () => {
	const projects: ProjectPage[] = [
		{
			slug: 'linux-wallpaper-engine',
			title: 'linux wallpaper engine',
			description: 'Another Linux Wallpaper Engine written with Rust and Wgpu',
			tags: ['Rust', 'WGPU', 'Vulkan']
		},
		{
			slug: 'neotv',
			title: 'NeoTV',
			description: 'A free, cross-platform online video search and viewing application',
			tags: ['Tauri', 'Svelte', 'Rust']
		}
	];

	return { projects };
};
