<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { RouteId } from '$app/types';
	import Dropdown from '$lib/components/dropdown.svelte';
	import Tooltip from '$lib/components/tooltip.svelte';
	import { locale, localeLabels, locales, type Locale } from '$lib/stores/locale-store';
	import { theme } from '$lib/stores/theme-store';
	import * as m from '$paraglide/messages.js';
	import { onMount } from 'svelte';
	import { prefersReducedMotion, Spring } from 'svelte/motion';

	/** how far the nav may travel in either direction (px) */
	const MAX_TRAVEL = 24;
	/** px of drift per px/ms of scroll velocity */
	const DRIFT_GAIN = 20;
	/** weight of the newest sample inside the moving average */
	const VELOCITY_ALPHA = 0.22;
	/** a single sample is never allowed to exceed this speed (px/ms) */
	const MAX_SAMPLE = 8;
	/** without a scroll event for this long the nav drifts home (ms) */
	const IDLE_DELAY = 90;
	/** the target only changes when it moved by more than this (px) */
	const TARGET_EPSILON = 0.5;

	// @ts-expect-error - paraglide generates exports with special characters
	const t = (key: string) => (m as Record<string, () => string>)[key]?.() ?? key;

	/* the nav hangs on a spring — it never snaps, it settles */
	const offset = new Spring(0, { stiffness: 0.18, damping: 0.85 });

	/** smoothed scroll velocity in px/ms (positive = scrolling down) */
	let velocity = 0;
	let target = 0;
	let lastY = 0;
	let lastTime = 0;
	let idleTimer: ReturnType<typeof setTimeout> | undefined;

	function clamp(value: number, min: number, max: number) {
		return Math.max(min, Math.min(max, value));
	}

	function sample(now: number) {
		const y = window.scrollY;
		const dt = now - lastTime;

		if (dt > 0) {
			const instant = clamp((y - lastY) / dt, -MAX_SAMPLE, MAX_SAMPLE);
			velocity = velocity * (1 - VELOCITY_ALPHA) + instant * VELOCITY_ALPHA;
		}

		lastY = y;
		lastTime = now;

		/* the nav travels with the page: scrolling down lifts it, scrolling
		   up drops it back — the spring gives the weight. Both directions
		   travel the same distance. */
		const next = clamp(-velocity * DRIFT_GAIN, -MAX_TRAVEL, MAX_TRAVEL);
		if (Math.abs(next - target) > TARGET_EPSILON) {
			target = next;
			offset.set(target);
		}

		clearTimeout(idleTimer);
		idleTimer = setTimeout(() => {
			velocity = 0;
			target = 0;
			offset.set(0);
		}, IDLE_DELAY);
	}

	onMount(() => {
		lastY = window.scrollY;
		lastTime = performance.now();

		const onScroll = () => {
			// reduced motion — the nav simply stays where it is
			if (prefersReducedMotion.current) return;
			sample(performance.now());
		};

		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
			clearTimeout(idleTimer);
		};
	});

	function selectLocale(newLocale: Locale) {
		locale.set(newLocale);
	}
</script>

<div
	class="pointer-events-none fixed inset-x-0 bottom-12 z-100 flex"
	style="transform: translate3d(0, {offset.current}px, 0)"
>
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
	</div>
</div>
