<script lang="ts">
	import { resolve } from '$app/paths';
	import Dropdown from '$lib/components/dropdown.svelte';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { locale, localeLabels, locales, type Locale } from '$lib/stores/locale-store';
	import { theme } from '$lib/stores/theme-store';
	import * as m from '$paraglide/messages.js';
	import { activate, navActions } from './nav-items';

	// @ts-expect-error - paraglide generates exports with special characters
	const t = (key: string) => (m as Record<string, () => string>)[key]?.() ?? key;

	/* the list follows the language and the theme */
	const actions = $derived(navActions(t, $theme, $locale));

	function selectLocale(newLocale: Locale) {
		locale.set(newLocale);
	}
</script>

<!--
	The bar face of the navigation: a single pill with every action.
	It is still — it never drifts with the scroll.

	A touch device gets the wheel instead (see NavRoulette). The face is
	chosen by the device and not by the orientation: a phone turned sideways
	is still a phone, and the bar does not fit in a phone held sideways.
-->
<div class="pointer-events-none fixed inset-x-0 bottom-12 z-100 hidden pointer-fine:flex">
	<div
		class="layout pointer-events-auto m-auto flex min-w-max cursor-default gap-3 rounded-lg border border-border bg-fg p-2 text-sm text-text/70 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
	>
		{#each actions as action (action.id)}
			{#if action.id === 'lang'}
				<Dropdown
					popOffset={{ x: 0, y: 240 }}
					triggerClass="size-8 hover:bg-accent/10 active:bg-accent/20"
				>
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
			{:else if action.href && action.external}
				<!-- the address leaves the site — there is no route to resolve -->
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					title={action.label}
					class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
					href={action.href}
					target="_blank"
					rel="noreferrer"
				>
					<span class="m-auto {action.icon}"></span>
					<Tooltip popOffset={{ x: 0, y: 140 }}>
						<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
							<span class="mx-auto my-auto">{action.label}</span>
						</div>
					</Tooltip>
				</a>
			{:else if action.route}
				<a
					title={action.label}
					class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
					href={resolve(action.route)}
				>
					<span class="m-auto {action.icon}"></span>
					<Tooltip popOffset={{ x: 0, y: 140 }}>
						<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
							<span class="mx-auto my-auto">{action.label}</span>
						</div>
					</Tooltip>
				</a>
			{:else}
				<button
					type="button"
					title={action.label}
					class="relative my-auto flex size-8 cursor-pointer items-center justify-center rounded-md border border-transparent transition-all hover:bg-accent/10 active:bg-accent/20"
					onclick={() => activate(action)}
				>
					<span class="m-auto {action.icon}"></span>
					<Tooltip popOffset={{ x: 0, y: 140 }}>
						<div class="flex size-full rounded-md border border-border/50 bg-fg px-3 py-1">
							<span class="mx-auto my-auto">{action.label}</span>
						</div>
					</Tooltip>
				</button>
			{/if}
		{/each}
	</div>
</div>
