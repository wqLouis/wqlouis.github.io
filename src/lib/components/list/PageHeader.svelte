<script lang="ts">
	import { resolve } from '$app/paths';
	import type { ResolvedPathname } from '$app/types';
	import { reveal } from '$lib/utils/reveal';
	import ReturnButton from '$lib/components/ReturnButton.svelte';

	let {
		title = '',
		backHref = resolve('/'),
		backLabel = '',
		revealDelay = 0
	}: {
		/** the page title — the only text the header carries */
		title?: string;
		/** where the round back button points to */
		backHref?: ResolvedPathname;
		/** accessible label of the back button */
		backLabel?: string;
		/** scroll reveal delay in milliseconds */
		revealDelay?: number;
	} = $props();
</script>

<header class="flex flex-col gap-10" use:reveal={{ delay: revealDelay }}>
	<div class="flex items-center gap-5">
		<ReturnButton href={backHref} label={backLabel} />

		<h1 class="text-2xl font-light tracking-wider break-words text-text md:text-3xl">
			{title}
		</h1>
	</div>

	<div class="h-px w-full bg-border/60"></div>
</header>
