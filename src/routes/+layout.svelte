<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Tooltip from '$lib/components/tooltip.svelte';
	import Dropdown from '$lib/components/dropdown.svelte';
	import type { RouteId } from '$app/types';
	import { theme } from '$lib/stores/theme-store';
	import { locale, localeLabels, locales, type Locale } from '$lib/stores/locale-store';
	import * as m from '$paraglide/messages.js';
	import { onMount } from 'svelte';

	import '../app.css';
	let { children } = $props();

	onMount(() => {
		theme.initialize();
	});

	function selectLocale(newLocale: Locale) {
		locale.set(newLocale);
	}

	// @ts-expect-error - paraglide generates exports with special characters
	const t = (key: string) => (m as Record<string, () => string>)[key]?.() ?? key;
</script>

{#key $locale}
	{@render children()}
{/key}

<div class="pointer-events-none fixed bottom-12 z-100 flex w-screen">
	<div
		class="layout pointer-events-auto m-auto flex min-w-max cursor-default gap-3 rounded-lg border border-border bg-fg p-2 text-sm text-text/70 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
	>
		<button
			title={t('common_nav_home')}
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
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
					<span class="mx-auto my-auto">{t('common_nav_home')}</span>
				</div>
			</Tooltip>
		</button>
		<a
			title={t('common_nav_blogs')}
			href={resolve('/blogs' as RouteId)}
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
		>
			<span class="m-auto icon-[heroicons--book-open-20-solid] transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">{t('common_nav_blogs')}</span>
				</div>
			</Tooltip>
		</a>
		<a
			title={t('common_nav_projects')}
			href={resolve('/projects' as RouteId)}
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
		>
			<span class="m-auto icon-[heroicons--rectangle-stack-20-solid] transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">{t('common_nav_projects')}</span>
				</div>
			</Tooltip>
		</a>
		<a
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
			title={t('common_nav_github')}
			href="https://github.com/wqLouis"
			target="_blank"
		>
			<span class="m-auto icon-[octicon--mark-github-24] size-5"></span>
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">{t('common_nav_github')}</span>
				</div>
			</Tooltip>
		</a>
		<a
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
			title={t('common_nav_email')}
			href="mailto:wql-louis@outlook.com"
		>
			<span class="m-auto icon-[material-symbols--mail-rounded] size-5 transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">{t('common_nav_email')}</span>
				</div>
			</Tooltip>
		</a>
		<button
			type="button"
			onclick={() => theme.toggle()}
			class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
			aria-label={`Current theme: ${$theme}. Click to toggle.`}
			title={t('common_nav_theme')}
		>
			{#if $theme === 'light'}
				<span class="m-auto icon-[heroicons--sun-20-solid] size-5 transition-all"></span>
			{:else}
				<span class="m-auto icon-[heroicons--moon-20-solid] size-5 transition-all"></span>
			{/if}
			<Tooltip popOffset={{ x: 0, y: 140 }}>
				<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
					<span class="mx-auto my-auto">{t('common_nav_theme')}</span>
				</div>
			</Tooltip>
		</button>
		<Dropdown popOffset={{ x: 0, y: 240 }} triggerClass="size-8 hover:bg-accent/10 active:bg-accent/20">
			<span class="text-xs font-light tracking-wider">{localeLabels[$locale]}</span>
			{#snippet menu()}
				{#each locales as loc (loc)}
					<button
						type="button"
						onclick={() => selectLocale(loc)}
						class="rounded-md px-3 py-1.5 text-xs font-light tracking-wider whitespace-nowrap transition-all hover:bg-accent/10 active:bg-accent/20 {loc ===
						$locale
							? 'border border-border'
							: 'border border-transparent'}"
					>
						{localeLabels[loc]}
					</button>
				{/each}
			{/snippet}
		</Dropdown>
	</div>
</div>
