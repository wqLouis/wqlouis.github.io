<script lang="ts">
	const roadmap = [
		{ done: true, text: 'Improve stability and error handling' },
		{ done: false, status: 'wip', text: 'Add support for more shader types' },
		{ done: true, text: 'Implement audio support' },
		{ done: false, text: 'Animation support' },
		{ done: false, text: '.mdl file loading' }
	];
	const knownIssues = [
		'Video textures not supported yet',
		'Highly unstable and under heavy development',
		'Some shader types may not work correctly',
		'Performance may vary depending on hardware'
	];
</script>

<section id="development" class="flex flex-col px-8 py-24">
	<div class="mx-auto w-full max-w-2xl">
		<h2 class="mb-16 text-center text-xl font-light tracking-wider text-text/70">Development</h2>

		<div class="space-y-16">
			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">Roadmap</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-3">
					{#each roadmap as item (item.text)}
						<li class="flex items-center text-xs font-light tracking-wide text-text/60">
							{#if item.done}
								<span class="mr-3 text-text/40">[done]</span>
							{:else if item.status === 'wip'}
								<span class="mr-3 text-text/40">[wip]</span>
							{:else}
								<span class="mr-3 text-text/30">[todo]</span>
							{/if}
							<span class={item.done ? 'text-text/70' : 'text-text/50'}>{item.text}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">Known Issues</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-3">
					{#each knownIssues as issue (issue)}
						<li class="flex items-center text-xs font-light tracking-wide text-text/60">
							<span class="mr-3 text-text/30">[!]</span>
							<span>{issue}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">Disclaimer</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-3">
					<li class="flex items-center text-xs font-light tracking-wide text-text/60">
						<span class="mr-3 text-text/30">[i]</span>
						<span>This project is not affiliated with or endorsed by Wallpaper Engine.</span>
					</li>
					<li class="flex items-center text-xs font-light tracking-wide text-text/60">
						<span class="mr-3 text-text/30">[i]</span>
						<span>Please support the original software by purchasing it on Steam.</span>
					</li>
					<li class="flex items-center text-xs font-light tracking-wide text-text/60">
						<span class="mr-3 text-text/30">[i]</span>
						<span>This project is licensed under the GPLv3 License.</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-16 flex flex-col items-center gap-6">
			<div class="h-px w-full bg-border/20"></div>
			<div class="flex flex-wrap justify-center gap-4">
				<a
					href="https://www.rust-lang.org/"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-border/30 px-4 py-1.5 text-[11px] font-light tracking-wider text-text/50 transition-all hover:border-text hover:text-text"
					>Rust</a
				>
				<a
					href="https://github.com/gfx-rs/wgpu"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-border/30 px-4 py-1.5 text-[11px] font-light tracking-wider text-text/50 transition-all hover:border-text hover:text-text"
					>Wgpu</a
				>
				<a
					href="https://www.vulkan.org/"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-border/30 px-4 py-1.5 text-[11px] font-light tracking-wider text-text/50 transition-all hover:border-text hover:text-text"
					>Vulkan</a
				>
			</div>
			<a
				href="https://github.com/wqLouis/linux-wallpaperengine"
				target="_blank"
				rel="noopener noreferrer"
				class="text-xs font-light tracking-wide text-text/50 transition-all hover:text-text">View on GitHub →</a
			>
		</div>
	</div>
</section>
