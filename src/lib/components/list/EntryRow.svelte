<script lang="ts">
	import { reveal } from '$lib/utils/reveal';
	import { formatBlogDate, formatDateISO } from '$lib/utils/date-utils';

	let {
		title = '',
		description = '',
		href = '/',
		tags = [] as string[],
		date = '',
		index = '',
		actionLabel = '',
		revealDelay = 0
	}: {
		/** the entry title */
		title?: string;
		/** one or two lines of context */
		description?: string;
		/** where the row points to */
		href?: string;
		/** optional pills */
		tags?: string[];
		/** optional date — rendered as micro meta */
		date?: string;
		/** optional index — rendered in clay, like the krkr-rs feature rows */
		index?: string;
		/** optional call to action on the right */
		actionLabel?: string;
		/** scroll reveal delay in milliseconds */
		revealDelay?: number;
	} = $props();

	const formattedDate = $derived(formatBlogDate(date));
	const isoDate = $derived(formatDateISO(date));

	/* without an index the title takes the free first column */
	const titleSpan = $derived(
		index ? 'col-span-10 md:col-span-4 md:pr-8 md:pl-6' : 'col-span-12 md:col-span-5 md:pr-8'
	);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	aria-label={title}
	use:reveal={{ delay: revealDelay }}
	class="group grid grid-cols-12 items-center gap-y-2 border-b border-border/50 py-6 transition-colors hover:bg-fg/50 md:gap-y-0 md:py-8"
>
	{#if index}
		<div class="col-span-2 md:col-span-1">
			<span class="text-[11px] font-light tracking-[0.18em] text-[var(--accent-clay)] tabular-nums">
				{index}
			</span>
		</div>
	{/if}

	<div class="{titleSpan} flex min-w-0 flex-col gap-2">
		<h2
			class="text-base font-light tracking-wider break-words text-text transition-colors group-hover:text-[var(--accent-clay)]"
		>
			{title}
		</h2>

		{#if formattedDate}
			<time
				class="text-[10px] font-light tracking-[0.22em] text-text/40 uppercase md:hidden"
				datetime={isoDate}>{formattedDate}</time
			>
		{/if}
	</div>

	<div class="col-span-12 min-w-0 md:col-span-4 md:pl-6">
		<p
			class="line-clamp-2 text-xs leading-relaxed font-light tracking-wide break-words text-text/60"
		>
			{description}
		</p>
	</div>

	<div
		class="col-span-12 flex min-w-0 flex-col items-start gap-3 md:col-span-3 md:items-end md:pl-6"
	>
		{#if formattedDate}
			<time
				class="hidden text-[10px] font-light tracking-[0.22em] text-text/40 uppercase md:block"
				datetime={isoDate}>{formattedDate}</time
			>
		{/if}

		{#if tags.length > 0}
			<div class="flex flex-wrap gap-2 md:justify-end">
				{#each tags as tag (tag)}
					<span
						class="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-light tracking-widest text-text/40"
					>
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		{#if actionLabel}
			<span
				class="inline-flex items-center gap-1 text-[11px] font-light tracking-[0.18em] text-text/70 uppercase transition-colors group-hover:text-[var(--accent-clay)]"
			>
				{actionLabel}
				<span class="icon-[heroicons--arrow-right-20-solid] size-3"></span>
			</span>
		{/if}
	</div>
</a>
