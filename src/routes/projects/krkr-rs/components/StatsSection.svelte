<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import StatCounter from './StatCounter.svelte';
	import { reveal } from '$lib/utils/reveal';

	const stats = [
		{ value: 25, suffix: '', label: m.krkr_stats_classes() },
		{ value: 660, suffix: '', label: m.krkr_stats_members() },
		{ value: 100, suffix: '%', label: m.krkr_stats_coverage() },
		{ value: 4, suffix: '', label: m.krkr_stats_layers() }
	];
</script>

<section class="border-y border-border/50 bg-fg/60">
	<div class="mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-16">
		<div class="mb-10 flex items-baseline justify-between" use:reveal>
			<h2 class="text-xs font-light tracking-[0.28em] text-text/55 uppercase">
				{m.krkr_stats_title()}
			</h2>
			<span class="text-[10px] font-light tracking-[0.22em] text-text/30 uppercase">2026</span>
		</div>

		<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
			{#each stats as stat, i (stat.label)}
				<div use:reveal={{ delay: i * 90 }}>
					<StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
				</div>
			{/each}
		</div>
	</div>
</section>
