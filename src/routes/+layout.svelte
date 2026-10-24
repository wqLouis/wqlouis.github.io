<script lang="ts">
	import { afterNavigate, onNavigate } from '$app/navigation';
	import BottomNav from '$lib/components/nav/BottomNav.svelte';
	import { locale } from '$lib/stores/locale-store';
	import { theme } from '$lib/stores/theme-store';
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';

	import '../app.css';
	let { children } = $props();

	/** how long the content takes to blur and fade out (ms) */
	const EXIT_MS = 220;
	/** safety net — if a navigation never lands the content comes back (ms) */
	const RESTORE_MS = 1500;

	/** true while the page content is blurred out */
	let exiting = $state(false);
	let restoreTimer: ReturnType<typeof setTimeout> | undefined;

	onMount(() => {
		theme.initialize();
	});

	afterNavigate(() => {
		// the new page is in place — let the content fade back in
		clearTimeout(restoreTimer);
		exiting = false;
	});

	onNavigate((navigation) => {
		const to = navigation.to?.url;
		const from = navigation.from?.url;

		// a hash change on the same page is not a page change
		if (to && from && to.pathname === from.pathname && to.hash === from.hash) return;

		// reduced motion — navigate right away, the content stays visible
		if (prefersReducedMotion.current) return;

		exiting = true;

		// the navigation waits for the exit animation to finish
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();

				// if the navigation never lands, the content has to come back
				restoreTimer = setTimeout(() => {
					exiting = false;
				}, RESTORE_MS);
			}, EXIT_MS);
		});
	});
</script>

<div class="page-content">
	<div class="page-views" class:page-views-exiting={exiting}>
		{#key $locale}
			{@render children()}
		{/key}
	</div>
</div>

<BottomNav />

<style>
	/* the page content blurs and fades, the nav stays crisp.
	   The background sits on the OUTER layer: it must not fade with the
	   content, otherwise the browser's white canvas shows through. */
	.page-content {
		min-height: 100%;
		background-color: var(--background);
	}

	.page-views {
		transition:
			opacity 220ms cubic-bezier(0.22, 1, 0.36, 1),
			filter 220ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.page-views-exiting {
		opacity: 0;
		filter: blur(6px);
	}
</style>
