<script lang="ts">
	import CodeBlock from '$lib/components/code-block.svelte';
	import * as m from '$paraglide/messages.js';

	const videoUrl =
		'https://github.com/user-attachments/assets/3a2a6ed8-ddf5-4f0a-8c0d-80f8fcfc4af0';

	const usageCommand = `> linux-wallpaper-engine -p {path to pkg file}`;
</script>

<section id="features" class="flex flex-col px-8 py-24">
	<div class="mx-auto w-full max-w-2xl">
		<h2 class="mb-16 text-center text-xl font-light tracking-wider text-text/70">
			{m.linuxwallpaperengine_demo_title()}
		</h2>

		<div class="aspect-video w-full overflow-hidden rounded-lg border border-border">
			<video
				src={videoUrl}
				controls
				class="h-full w-full object-cover"
				preload="metadata"
				poster="https://raw.githubusercontent.com/wqLouis/linux-wallpaperengine/master/.github/images/preview.png"
			>
				<track kind="captions" />

				Your browser does not support the video tag.
				<a href={videoUrl} class="border-b border-text/50 text-text/60">Download</a>
			</video>
		</div>

		<div class="mt-16 space-y-12">
			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{m.linuxwallpaperengine_features_title()}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-4">
					{#each [m.linuxwallpaperengine_features_items_0(), m.linuxwallpaperengine_features_items_1(), m.linuxwallpaperengine_features_items_2()] as feature (feature)}
						<li class="flex items-center text-xs font-light tracking-wide text-text/60">
							<span class="mr-3 size-1 rounded-full bg-text/30"></span>
							<span>{feature}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{m.linuxwallpaperengine_requirements_title()}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-4">
					{#each [m.linuxwallpaperengine_requirements_items_0(), m.linuxwallpaperengine_requirements_items_1(), m.linuxwallpaperengine_requirements_items_2(), m.linuxwallpaperengine_requirements_items_3()] as requirement (requirement)}
						<li class="flex items-center text-xs font-light tracking-wide text-text/60">
							<span class="mr-3 size-1 rounded-full bg-text/30"></span>
							<span>{requirement}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{m.linuxwallpaperengine_usage_title()}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<p class="mt-6 text-xs font-light tracking-wide text-text/60">
					{m.linuxwallpaperengine_usage_command()}
				</p>
				<div
					class="mt-4 rounded-md border border-border bg-fg/40 p-4 font-mono text-xs text-text/60"
				>
					{usageCommand}
				</div>
			</div>
		</div>
	</div>
</section>
