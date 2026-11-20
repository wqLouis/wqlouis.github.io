<script lang="ts">
	import { locale, localeLabels, locales, type Locale } from '$lib/stores/locale-store';
	import { theme } from '$lib/stores/theme-store';
	import * as m from '$paraglide/messages.js';
	import { activate, navActions } from './nav-items';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';

	let { open = false, onclose }: { open?: boolean; onclose: () => void } = $props();

	// @ts-expect-error - paraglide generates exports with special characters
	const t = (key: string) => (m as Record<string, () => string>)[key]?.() ?? key;

	const actions = $derived(navActions(t, $theme, $locale));

	/** the language row opens a short list of the three locales */
	let languagesOpen = $state(false);

	/** a phone that asks for no motion gets none */
	const dur = $derived(prefersReducedMotion.current ? 0 : 320);

	$effect(() => {
		if (!open) {
			languagesOpen = false;
			return;
		}
		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onclose();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	function selectLocale(newLocale: Locale) {
		locale.set(newLocale);
		onclose();
	}

	function run(action: (typeof actions)[number]) {
		if (action.id === 'lang') {
			languagesOpen = !languagesOpen;
			return;
		}
		activate(action);
		onclose();
	}
</script>

<!--
	The plain way into the navigation: a sheet with every action on it.
	It opens from a tap on the wheel button and it is the path a keyboard
	or a screen reader takes.
-->
{#if open}
	<div class="fixed inset-0 z-110 flex items-end" role="dialog" aria-modal="true">
		<button
			type="button"
			class="absolute inset-0 cursor-default bg-bg/70 backdrop-blur-[2px]"
			aria-label={t('common_nav_close')}
			onclick={onclose}
			transition:fade={{ duration: dur / 2 }}
		></button>

		<div
			class="relative m-3 flex w-full flex-col gap-1 rounded-lg border border-border bg-fg p-2 shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
			transition:fly={{ y: 60, duration: dur, opacity: 0 }}
		>
			{#each actions as action (action.id)}
				<button
					type="button"
					class="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-light tracking-wide text-text/80 transition-colors hover:bg-accent/10 active:bg-accent/20"
					onclick={() => run(action)}
				>
					<span class="{action.icon} size-5 shrink-0 text-text/60"></span>
					<span class="flex-1">{action.label}</span>
					{#if action.id === 'lang'}
						<span
							class="icon-[heroicons--chevron-down-20-solid] size-4 shrink-0 text-text/40 transition-transform duration-200 {languagesOpen
								? 'rotate-180'
								: ''}"
						></span>
					{/if}
				</button>

				{#if action.id === 'lang' && languagesOpen}
					<div class="flex flex-col gap-1 px-3 pb-1">
						{#each locales as loc (loc)}
							<button
								type="button"
								class="flex min-h-10 cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-left text-xs font-light tracking-wider text-text/60 transition-colors hover:bg-accent/10 active:bg-accent/20 {loc ===
								$locale
									? 'text-text'
									: ''}"
								onclick={() => selectLocale(loc)}
							>
								<span class="w-8">{localeLabels[loc]}</span>
								<span class="flex-1">
									{loc === 'en' ? 'English' : loc === 'zh_cn' ? '简体中文' : '繁體中文'}
								</span>
							</button>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}
