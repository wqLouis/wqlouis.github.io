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
		}
	];

	return { projects };
};
