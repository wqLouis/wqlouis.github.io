export const load = () => {
	const projects = [
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
		},
		{
			slug: 'krkr-rs',
			title: 'krkr-rs',
			description:
				'A native Rust reimplementation of the KiriKiri2 (TVP) engine, running KiriKiri2 games on Linux and Android with a pure Rust + Vulkan pipeline',
			tags: ['Rust', 'Vulkan', 'KiriKiri2']
		}
	];

	return { projects };
};
