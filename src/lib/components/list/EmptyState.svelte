<script lang="ts">
	let {
		kicker = '',
		title = '',
		description = '',
		iconClass = ''
	}: {
		/** small clay eyebrow */
		kicker?: string;
		/** the headline of the placeholder */
		title?: string;
		/** one line of context */
		description?: string;
		/** a ready made icon class, e.g. "icon-[heroicons--document-text-20-solid] size-5" */
		iconClass?: string;
	} = $props();
</script>

<div class="mt-12 md:mt-16">
	<div class="relative overflow-hidden rounded-lg border border-border bg-fg">
		<!-- the same swiss grid the krkr-rs hero uses -->
		<div
			class="pointer-events-none absolute inset-0 opacity-30"
			style="background-image:
				repeating-linear-gradient(to bottom, var(--border) 0 1px, transparent 1px 64px),
				repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px 64px);"
		></div>

		<div class="relative flex flex-col items-center gap-5 px-6 py-20 text-center">
			{#if iconClass}
				<span
					class="flex size-12 items-center justify-center rounded-full border border-border bg-bg text-text/50"
				>
					<span class={iconClass}></span>
				</span>
			{/if}

			{#if kicker}
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{kicker}
				</span>
			{/if}

			{#if title}
				<h2 class="text-xl font-light tracking-wider text-text md:text-2xl">{title}</h2>
			{/if}

			{#if description}
				<p class="max-w-sm text-xs leading-relaxed font-light tracking-wide text-text/60">
					{description}
				</p>
			{/if}

			<div class="mt-2 h-px w-16 bg-[var(--accent-clay)]"></div>
		</div>
	</div>
</div>
