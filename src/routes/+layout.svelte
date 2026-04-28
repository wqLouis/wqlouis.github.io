<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Tooltip from '$lib/components/tooltip.svelte';
	import type { RouteId } from '$app/types';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	import '../app.css';
	let { children } = $props();

	onMount(() => {
		theme.initialize();
	});
</script>

{@render children()}

<div class="pointer-events-none fixed bottom-12 z-100 flex w-screen">
	<div
		class="layout pointer-events-auto m-auto flex min-w-max cursor-default gap-3 rounded-lg border border-border bg-fg p-2 text-sm text-text/70 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
	>
		<button
			title="Home"
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:border-text active:border-2 active:border-text"
			onclick={() => {
				if (page.url.pathname != '/') {
					goto(resolve('/'));
				} else {
					let home = document.getElementById('home');
					if (home != null) {
						home.scrollIntoView({
							behavior: 'smooth'
						});
					}
				}
			}}
		>
			<span class="m-auto icon-[heroicons--home-20-solid] transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">Home</span>
				</div>
			</Tooltip>
		</button>
		<a
			title="Blogs"
			href={resolve('/blogs' as RouteId)}
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:border-text active:border-2 active:border-text"
		>
			<span class="m-auto icon-[heroicons--book-open-20-solid] transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">Blogs</span>
				</div>
			</Tooltip>
		</a>
		<a
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:border-text active:border-2 active:border-text"
			title="github"
			href="https://github.com/wqLouis"
			target="_blank"
		>
			<span class="m-auto icon-[octicon--mark-github-24] size-5"></span>
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">Github</span>
				</div>
			</Tooltip>
		</a>
		<a
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:border-text active:border-2 active:border-text"
			title="mail"
			href="mailto:wql-louis@outlook.com"
		>
			<span class="m-auto icon-[material-symbols--mail-rounded] size-5 transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">Email</span>
				</div>
			</Tooltip>
		</a>
		<button
			type="button"
			onclick={() => theme.toggle()}
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:border-text active:border-2 active:border-text"
			aria-label={`Current theme: {$theme}. Click to toggle.`}
			title="Toggle theme"
		>
			{#if $theme === 'light'}
				<span class="m-auto icon-[heroicons--sun-20-solid] size-5 transition-all"></span>
			{:else}
				<span class="m-auto icon-[heroicons--moon-20-solid] size-5 transition-all"></span>
			{/if}
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">Theme</span>
				</div>
			</Tooltip>
		</button>
	</div>
</div>
