<script lang="ts">
	import { t } from '$lib/i18n';
	import { reveal } from '$lib/utils/reveal';

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
		t('neotv_features_items_0'),
		t('neotv_features_items_1'),
		t('neotv_features_items_2'),
		t('neotv_features_items_3'),
		t('neotv_features_items_4'),
		t('neotv_features_items_5')
	].map(splitEntry);

	const tech = [
		t('neotv_features_tech_0'),
		t('neotv_features_tech_1'),
		t('neotv_features_tech_2'),
		t('neotv_features_tech_3')
	].map(splitEntry);

	const steps = [
		{ label: t('neotv_features_installDeps').replace(/^#\s*/, ''), code: 'bun install' },
		{ label: t('neotv_features_runDev').replace(/^#\s*/, ''), code: 'bun run dev' },
		{ label: t('neotv_features_buildWeb').replace(/^#\s*/, ''), code: 'bun run build' },
		{
			label: t('neotv_features_buildAndroid').replace(/^#\s*/, ''),
			code: './scripts/build-android.sh'
		}
	];
</script>

<!-- ── features ─────────────────────────────────────────────────────── -->
<section id="features" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{t('neotv_hero_badges_1')}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{t('neotv_features_title')}
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

<!-- ── tech stack ───────────────────────────────────────────────────── -->
<section id="stack" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{t('neotv_hero_badges_0')}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{t('neotv_features_techStack')}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<div class="mt-12 border-t border-text/25 md:mt-16">
			{#each tech as item, i (item.title)}
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
							{item.title}
						</h3>
					</div>

					<div class="col-span-12 md:col-span-7 md:pl-6">
						<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">{item.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ── quick start ──────────────────────────────────────────────────── -->
<section id="quickstart" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{t('neotv_features_title')}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{t('neotv_features_quickStart')}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
			<div class="md:col-span-4" use:reveal>
				<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">
					{t('neotv_features_requirements')}
				</p>
			</div>

			<div class="flex flex-col gap-4 md:col-span-8">
				{#each steps as step, i (step.code)}
					<div
						use:reveal={{ delay: i * 100 }}
						class="overflow-hidden rounded-lg border border-border bg-fg"
					>
						<div class="flex items-center justify-between border-b border-border/40 px-5 py-3">
							<span class="text-[10px] font-light tracking-[0.22em] text-text/40 uppercase">
								{step.label}
							</span>
							<span class="size-1.5 rounded-full bg-[var(--accent-sand)]"></span>
						</div>
						<pre
							class="overflow-x-auto bg-[var(--accent-pine)] px-5 py-4 font-mono text-xs leading-relaxed text-[#f7f2e8]">{step.code}</pre>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
