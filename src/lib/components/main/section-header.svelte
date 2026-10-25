<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		index = '',
		title = '',
		action
	}: {
		/** the position of the section, rendered in clay */
		index?: string;
		/** the name of the section */
		title?: string;
		/** an optional control on the right of the header */
		action?: Snippet;
	} = $props();
</script>

<div
	class="flex flex-col gap-4 border-b border-border/60 pb-5 md:flex-row md:items-end md:justify-between"
>
	<div class="flex items-baseline gap-4">
		<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] tabular-nums">
			{index}
		</span>
		<h2 class="text-2xl font-light tracking-wider text-text md:text-3xl">{title}</h2>
	</div>

	{#if action}
		<div class="flex items-center gap-3">{@render action()}</div>
	{/if}
</div>
