<script lang="ts">
	import { Card3dAnimation } from '$lib/src/3dcardAnimation';

	export let title = '';
	export let discription = '';
	export let route = '/';
	export let date = '17-3-2026';
	export let tags: string[] = [];
</script>

<a
	class="mx-auto flex h-32 w-screen max-w-2xl flex-col rounded-2xl bg-border/10 px-5 py-3 transition-colors hover:bg-border/20 md:w-[60vw]"
	href={route}
>
	<div class="flex">
		<div class="flex w-auto flex-col">
			<span class="text-2xl font-bold text-text">{title}</span>
			<span class="text-sm font-semibold text-text/70">{discription}</span>
		</div>
	</div>
	<div class="mt-auto flex">
		<div class="flex gap-2">
			{#each tags as tag}
				<div class="rounded-full bg-text/5 px-2 py-1 text-xs text-text/50">{tag}</div>
			{/each}
		</div>

		<span class="mt-auto ml-auto text-xs font-semibold text-text/50">{date}</span>
	</div>
</a>
