<script lang="ts">
	export let title = 'Linux Wallpaper Engine';
	export let description = 'Another Linux Wallpaper Engine written with Rust and Wgpu';
	export let badges = ['Vulkan', 'High Performance'];
	export let githubUrl = 'https://github.com/wqLouis/linux-wallpaperengine';
</script>

<section id="main" class="relative h-screen overflow-hidden">
	<div class="flex h-full w-full items-center justify-center">
		<div class="mx-auto mt-[-10vh] flex cursor-default flex-col items-center text-center text-text">
			<div class="flex h-min max-w-4xl flex-col gap-4">
				<h1 class="z-10 text-4xl font-bold md:text-6xl">{title}</h1>
				<p class="text-sm font-medium text-text/80 md:text-base">{description}</p>
				<div class="flex flex-wrap justify-center gap-3 text-center text-xs text-text/30">
					{#each badges as badge (badge)}
						<div class="w-max rounded-full border-2 border-border bg-fg px-3 py-1.5">
							{badge}
						</div>
					{/each}
				</div>
			</div>
			<div class="mt-12 grid w-full max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2">
				<button
					title="Installation"
					class="animate-btn mx-auto flex w-full max-w-48 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-amber-800/50 bg-amber-600/30 px-6 py-3 text-lg font-bold text-text/90 shadow-amber-600/40 transition-all ease-out hover:scale-105 hover:bg-amber-600/40 hover:shadow-[0_0_12px] active:scale-95"
					onclick={() => {
						const section = document.getElementById('installation');
						section?.scrollIntoView({ behavior: 'smooth' });
					}}
				>
					<span class="my-auto">Installation</span>
					<span class="my-auto icon-[heroicons--arrow-right-20-solid] size-6"></span>
				</button>
				<a
					title="GitHub Repository"
					href={githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="animate-btn mx-auto flex w-full max-w-48 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-gray-700/90 bg-gray-900/50 px-6 py-3 text-center text-lg font-bold text-text/90 shadow-gray-700/50 transition-all ease-out hover:scale-105 hover:bg-gray-700/50 hover:shadow-[0_0_12px] active:scale-95"
				>
					<span class="my-auto">GitHub</span>
					<span class="my-auto icon-[octicon--mark-github-24] size-6"></span>
				</a>
			</div>
		</div>
	</div>
</section>
