<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		notice = '',
		noticeHref = '',
		children
	}: {
		/** small notice on the right — e.g. a licence or a source link */
		notice?: string;
		/** optional link target for the notice */
		noticeHref?: string;
		/** the left hand side of the footer */
		children?: Snippet;
	} = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<footer class="border-t border-border/40 pt-8 pb-16 md:pt-12 md:pb-0">
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<div class="text-xs font-light tracking-wide text-text/50">
			{@render children?.()}
		</div>

		{#if notice}
			{#if noticeHref}
				<a
					href={noticeHref}
					target="_blank"
					rel="noopener noreferrer"
					class="max-w-md border-b border-transparent text-[11px] leading-relaxed font-light tracking-wide text-text/40 transition-colors hover:border-text/40 hover:text-text/70"
				>
					{notice}
				</a>
			{:else}
				<p class="max-w-md text-[11px] leading-relaxed font-light tracking-wide text-text/40">
					{notice}
				</p>
			{/if}
		{/if}
	</div>
</footer>
