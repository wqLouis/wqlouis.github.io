<script lang="ts">
	let {
		link = 'https://wqlouis.github.io/',
		image = '',
		cardTitle = '',
		tags = [] as string[],
		fit = 'cover' as 'cover' | 'contain',
		index = ''
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
		/** the position of the card, rendered in clay */
		index?: string;
	} = $props();

	/** the fallback mark for the projects that have no preview */
	const monogram = $derived(cardTitle.slice(0, 1).toUpperCase());
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	href={link}
	target="_blank"
	rel="noreferrer"
	class="group flex flex-col overflow-hidden rounded-lg border border-border/60 bg-fg/30 transition-colors duration-300 hover:border-text/50"
>
	<!-- the preview: every card sits on the same swiss grid, so the ones
	     without a picture look deliberate instead of empty -->
	<div
		class="relative flex h-40 items-center justify-center overflow-hidden border-b border-border/40 bg-bg"
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
	<div class="flex flex-1 flex-col gap-5 p-5">
		<div class="flex items-start justify-between gap-3">
			<h3
				class="text-lg font-light tracking-wider break-words text-text transition-colors group-hover:text-[var(--accent-clay)]"
			>
				{cardTitle}
			</h3>
			<span
				class="icon-[heroicons--arrow-up-right-20-solid] size-4 shrink-0 text-text/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-clay)]"
			></span>
		</div>

		{#if tags.length > 0}
			<div class="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5">
				{#each tags as tag (tag)}
					<span
						class="text-[10px] font-light tracking-[0.18em] text-text/40 uppercase transition-colors group-hover:text-text/60"
					>
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>
</a>
