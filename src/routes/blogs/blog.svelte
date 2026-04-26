<script lang="ts">
	import { formatBlogDate, formatDateISO } from '$lib/utils/date';

	export let title = '';
	export let description = '';
	export let route = '/';
	export let date = '17-3-2026';
	export let tags: string[] = [];

	$: formattedDate = formatBlogDate(date);
	$: isoDate = formatDateISO(date);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	class="group mx-auto flex w-full max-w-3xl flex-col rounded-xl border-2 border-border bg-fg p-6 transition-all duration-300 hover:border-text/30 hover:shadow-[0_8px_30px] hover:shadow-text/10 md:w-[70vw]"
	href={route}
>
	<div class="flex flex-col gap-3">
		<div class="flex items-start justify-between gap-4">
			<h3 class="text-2xl font-bold text-text group-hover:text-text/90">{title}</h3>
			<time class="shrink-0 text-sm font-medium text-text/50" datetime={isoDate}
				>{formattedDate}</time
			>
		</div>

		<p class="line-clamp-2 text-text/80">{description}</p>

		{#if tags.length > 0}
			<div class="mt-2 flex flex-wrap gap-2">
				{#each tags as tag (tag)}
					<span class="rounded-full bg-border/30 px-3 py-1 text-xs font-medium text-text/70">
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		<div class="mt-4 flex items-center justify-between">
			<span
				class="inline-flex items-center gap-1 text-sm font-medium text-text/60 group-hover:text-text/80"
			>
				Read article
				<span
					class="icon-[heroicons--arrow-right-20-solid] size-4 transition-transform group-hover:translate-x-1"
				></span>
			</span>
		</div>
	</div>
</a>
