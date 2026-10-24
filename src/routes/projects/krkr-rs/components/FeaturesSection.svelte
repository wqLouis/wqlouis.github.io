<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import { reveal } from '$lib/utils/reveal';

	const features = [
		{ title: m.krkr_features_items_0_title(), desc: m.krkr_features_items_0_desc() },
		{ title: m.krkr_features_items_1_title(), desc: m.krkr_features_items_1_desc() },
		{ title: m.krkr_features_items_2_title(), desc: m.krkr_features_items_2_desc() },
		{ title: m.krkr_features_items_3_title(), desc: m.krkr_features_items_3_desc() },
		{ title: m.krkr_features_items_4_title(), desc: m.krkr_features_items_4_desc() }
	];
</script>

<section id="features" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.krkr_features_kicker()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.krkr_features_title()}
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
