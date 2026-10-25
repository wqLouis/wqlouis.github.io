<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import { reveal } from '$lib/utils/reveal';

	const videoUrl =
		'https://github.com/user-attachments/assets/3a2a6ed8-ddf5-4f0a-8c0d-80f8fcfc4af0';

	const usageCommand = `> linux-wallpaper-engine -p {path to pkg file}`;

	/** "Title: Description" → a title and a description */
	function splitEntry(value: string) {
		const index = value.indexOf(':');
		if (index === -1) return { title: value, desc: '' };
		return {
			title: value.slice(0, index).trim(),
			desc: value.slice(index + 1).trim()
		};
	}

	const features = [
		m.linuxwallpaperengine_features_items_0(),
		m.linuxwallpaperengine_features_items_1(),
		m.linuxwallpaperengine_features_items_2()
	].map(splitEntry);

	const requirements = [
		m.linuxwallpaperengine_requirements_items_0(),
		m.linuxwallpaperengine_requirements_items_1(),
		m.linuxwallpaperengine_requirements_items_2(),
		m.linuxwallpaperengine_requirements_items_3()
	].map(splitEntry);
</script>

<!-- ── demo ─────────────────────────────────────────────────────────── -->
<section id="demo" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.linuxwallpaperengine_hero_badges_1()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.linuxwallpaperengine_demo_title()}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<div
			class="mt-12 overflow-hidden rounded-lg border border-border bg-fg"
			use:reveal={{ delay: 120 }}
		>
			<div class="aspect-video w-full">
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
		</div>
	</div>
</section>

<!-- ── features ─────────────────────────────────────────────────────── -->
<section id="features" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.linuxwallpaperengine_hero_badges_0()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.linuxwallpaperengine_features_title()}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<div class="mt-12 border-t border-text/25 md:mt-16">
			{#each features as feature, i (feature.title)}
				<div
					use:reveal={{ delay: i * 70 }}
					class="group grid grid-cols-12 items-center gap-y-2 border-b border-border/50 py-6 transition-colors hover:bg-fg/50 md:gap-y-0 md:py-8"
				>
					<div class="col-span-2 md:col-span-1">
						<span
							class="text-[11px] font-light tracking-[0.18em] text-[var(--accent-clay)] tabular-nums"
						>
							{String(i + 1).padStart(2, '0')}
						</span>
					</div>

					<div class="col-span-10 md:col-span-4 md:pr-8 md:pl-6">
						<h3
							class="text-base font-light tracking-wider text-text transition-colors group-hover:text-[var(--accent-clay)]"
						>
							{feature.title}
						</h3>
					</div>

					<div class="col-span-12 md:col-span-7 md:pl-6">
						<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">
							{feature.desc}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ── requirements ─────────────────────────────────────────────────── -->
<section id="requirements" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.linuxwallpaperengine_features_title()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.linuxwallpaperengine_requirements_title()}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<div class="mt-12 border-t border-text/25 md:mt-16">
			{#each requirements as requirement, i (requirement.title)}
				<div
					use:reveal={{ delay: i * 70 }}
					class="group grid grid-cols-12 items-center gap-y-2 border-b border-border/50 py-6 transition-colors hover:bg-fg/50 md:gap-y-0 md:py-8"
				>
					<div class="col-span-2 md:col-span-1">
						<span
							class="text-[11px] font-light tracking-[0.18em] text-[var(--accent-clay)] tabular-nums"
						>
							{String(i + 1).padStart(2, '0')}
						</span>
					</div>

					<div class="col-span-10 md:col-span-11 md:pl-6">
						<h3
							class="text-base font-light tracking-wider text-text transition-colors group-hover:text-[var(--accent-clay)]"
						>
							{requirement.title}
						</h3>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ── usage ────────────────────────────────────────────────────────── -->
<section id="usage" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.linuxwallpaperengine_features_title()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.linuxwallpaperengine_usage_title()}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
			<div class="md:col-span-4" use:reveal>
				<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">
					{m.linuxwallpaperengine_usage_command()}
				</p>
			</div>

			<div class="md:col-span-8" use:reveal={{ delay: 120 }}>
				<div class="overflow-hidden rounded-lg border border-border bg-fg">
					<div class="flex items-center justify-between border-b border-border/40 px-5 py-3">
						<span class="text-[10px] font-light tracking-[0.22em] text-text/40 uppercase">
							{m.linuxwallpaperengine_usage_title()}
						</span>
						<span class="size-1.5 rounded-full bg-[var(--accent-sand)]"></span>
					</div>
					<pre
						class="overflow-x-auto bg-[var(--accent-pine)] px-5 py-4 font-mono text-xs leading-relaxed text-[#f7f2e8]">{usageCommand}</pre>
				</div>
			</div>
		</div>
	</div>
</section>
