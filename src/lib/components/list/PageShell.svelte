<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		footer
	}: {
		/** main page content */
		children: Snippet;
		/** optional footer, rendered below the content column */
		footer?: Snippet;
	} = $props();
</script>

<div class="list-page relative flex min-h-screen w-full flex-col bg-bg text-text">
	<!-- the whole page — title, list and footer — is one block, centred in the
	     viewport. Auto margins centre it without clipping the top when the
	     list grows taller than the screen. -->
	<main class="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-20 md:px-10 md:py-28">
		<div class="my-auto flex flex-col">
			{@render children()}

			{#if footer}
				<div class="mt-16 md:mt-24">
					{@render footer()}
				</div>
			{/if}
		</div>
	</main>
</div>

<style>
	/* the krkr-rs typeface — Helvetica first, Inter as the fallback */
	.list-page {
		font-family: 'Helvetica Neue', Helvetica, Arial, 'Inter', system-ui, sans-serif;
	}

	.list-page ::selection {
		background: #d76b3f;
		color: #f8f6f0;
	}
</style>
