<script lang="ts">
	const badges = ['Vulkan', 'High Performance'];
	const githubUrl = 'https://github.com/wqLouis/linux-wallpaperengine';
</script>

<section id="main" class="flex min-h-screen items-start justify-center px-8 pt-[35vh]">
	<div class="mx-auto max-w-3xl text-center">
		<div class="mb-3 flex justify-center gap-3">
			{#each badges as badge (badge)}
				<span
					class="rounded-full border border-border/30 px-4 py-1 text-xs tracking-wide text-text/50"
				>
					{badge}
				</span>
			{/each}
		</div>

		<h1 class="mb-6 text-5xl font-light tracking-tight md:text-7xl">Linux Wallpaper Engine</h1>

		<p class="mb-12 text-lg font-light text-text/60 md:text-xl">
			Another Linux Wallpaper Engine written with Rust and Wgpu
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<button
				class="flex cursor-pointer items-center gap-2 rounded-full bg-fg/80 px-8 py-3 text-sm tracking-wide text-text/70 transition-all hover:bg-fg hover:text-text"
				onclick={() =>
					document.getElementById('installation')?.scrollIntoView({ behavior: 'smooth' })}
			>
				<span>Installation</span>
				<span class="icon-[heroicons--arrow-right-20-solid] size-4"></span>
			</button>
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex cursor-pointer items-center gap-2 rounded-full bg-fg/80 px-8 py-3 text-sm tracking-wide text-text/70 transition-all hover:bg-fg hover:text-text"
			>
				<span>GitHub</span>
				<span class="icon-[octicon--mark-github-24] size-5"></span>
			</a>
		</div>
	</div>
</section>
