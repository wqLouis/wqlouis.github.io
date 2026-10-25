<script lang="ts">
	let {
		link = 'https://wqlouis.github.io/',
		image = '',
		cardTitle = '',
		tags = [] as string[],
		fit = 'cover' as 'cover' | 'contain',
		index = '',
		active = false
	}: {
		/** where the card points to */
		link?: string;
		/** the preview picture */
		image?: string;
		/** the project name */
		cardTitle?: string;
		/** the stack the project is built with */
		tags?: string[];
		/** how the preview fills the frame — 'contain' keeps square icons uncropped */
		fit?: 'cover' | 'contain';
		/** the position of the card, rendered in the corner */
		index?: string;
		/** whether this card is the one in the middle of the reel */
		active?: boolean;
	} = $props();

	/** the fallback mark for the projects that have no preview */
	const monogram = $derived(cardTitle.slice(0, 1).toUpperCase());
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	href={link}
	target="_blank"
	rel="noreferrer"
	class="group flex h-full flex-col overflow-hidden rounded-lg border bg-bg transition-colors duration-300 {active
		? 'border-text/45'
		: 'border-border/60 hover:border-text/45'}"
>
	<!-- the preview: every card stands on the same swiss grid, so the ones
	     without a picture look deliberate instead of empty -->
	<div
		class="relative flex h-44 shrink-0 items-center justify-center overflow-hidden border-b border-border/40"
	>
		<div
			class="pointer-events-none absolute inset-0 opacity-45"
			style="background-image:
				repeating-linear-gradient(to bottom, var(--border) 0 1px, transparent 1px 26px),
				repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px 26px);"
		></div>

		{#if index}
			<span
				class="absolute top-3 left-4 text-[10px] font-light tracking-[0.22em] text-text/30 tabular-nums"
			>
				{index}
			</span>
		{/if}

		{#if image}
			<img
				src={image}
				alt=""
				class="relative size-full transition-transform duration-500 ease-out group-hover:scale-105 {fit ===
				'contain'
					? 'object-contain p-8'
					: 'object-cover'}"
			/>
		{:else}
			<span class="relative text-5xl font-light tracking-tight text-text/15 select-none">
				{monogram}
			</span>
		{/if}
	</div>

	<!-- the body -->
	<div class="flex flex-1 flex-col gap-4 p-5">
		<div class="flex items-start justify-between gap-3">
			<h3
				class="text-base font-light tracking-wider break-words transition-colors duration-300 {active
					? 'text-[var(--accent-clay)]'
					: 'text-text group-hover:text-[var(--accent-clay)]'}"
			>
				{cardTitle}
			</h3>
			<span
				class="icon-[heroicons--arrow-up-right-20-solid] size-4 shrink-0 text-text/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-clay)]"
			></span>
		</div>

		{#if tags.length > 0}
			<div class="mt-auto flex flex-wrap gap-1.5">
				{#each tags as tag (tag)}
					<span
						class="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-light tracking-widest text-text/40"
					>
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</a>
