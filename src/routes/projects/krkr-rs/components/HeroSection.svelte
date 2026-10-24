<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import { prefersReducedMotion } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import ReturnButton from '$lib/components/ReturnButton.svelte';
	import icon from '$lib/assets/gamedev/krkr-rs.svg';

	const githubUrl = 'https://github.com/wqLouis/krkr-rs';

	/* the latest release, served straight from GitHub (always the newest tag) */
	const releasePageUrl = 'https://github.com/wqLouis/krkr-rs/releases/latest';
	const linuxReleaseUrl =
		'https://github.com/wqLouis/krkr-rs/releases/latest/download/krkr-rs-linux-x86_64.tar.gz';
	const androidReleaseUrl =
		'https://github.com/wqLouis/krkr-rs/releases/latest/download/app-release.apk';

	/* pick the asset that matches the visitor platform; everyone else lands on
	   the release page where both downloads are listed */
	let downloadUrl = $state(releasePageUrl);

	onMount(() => {
		const ua = navigator.userAgent;
		if (/Android/i.test(ua)) downloadUrl = androidReleaseUrl;
		else if (/Linux|X11/i.test(ua)) downloadUrl = linuxReleaseUrl;
	});

	let stage = $state<HTMLDivElement | undefined>();
	let anchor = $state<HTMLDivElement | undefined>();
	let iconWrap = $state<HTMLDivElement | undefined>();

	// the icon starts in the middle and then travels to its place next to the title
	let iconLeft = $state('50%');
	let iconTop = $state('50%');
	let iconScale = $state(0.82);
	let iconOpacity = $state(0);

	/** the vertical centre of the title row — where the icon appears first */
	function centre() {
		if (!stage || !anchor) return;
		const s = stage.getBoundingClientRect();
		const a = anchor.getBoundingClientRect();
		iconTop = `${a.top + a.height / 2 - s.top}px`;
	}

	/** the final spot: right next to the title, on its left */
	function land() {
		if (!stage || !anchor) return;
		const s = stage.getBoundingClientRect();
		const a = anchor.getBoundingClientRect();
		iconLeft = `${a.left + a.width / 2 - s.left}px`;
		iconTop = `${a.top + a.height / 2 - s.top}px`;
		iconScale = 1;
	}

	$effect(() => {
		if (prefersReducedMotion.current) {
			iconOpacity = 1;
			land();
			return;
		}

		const timers: ReturnType<typeof setTimeout>[] = [];

		// 1 — the icon shows up in the middle of the group
		timers.push(
			setTimeout(() => {
				centre();
				iconOpacity = 1;
			}, 80)
		);

		// 2 — it travels to the left and the title flies out of it
		timers.push(setTimeout(() => land(), 620));

		const observer = new ResizeObserver(() => {
			if (iconScale === 1) land();
		});
		if (anchor) observer.observe(anchor);

		return () => {
			timers.forEach(clearTimeout);
			observer.disconnect();
		};
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<section class="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-24 md:px-10">
	<!-- swiss grid -->
	<div
		class="pointer-events-none absolute inset-0 opacity-45"
		style="background-image:
			repeating-linear-gradient(to bottom, var(--border) 0 1px, transparent 1px 112px),
			repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px 8.3333%);"
	></div>

	<span class="hero-return absolute top-7 left-6 z-20 md:left-10" style="--d: 1000ms">
		<ReturnButton href={resolve('/projects')} label={m.krkr_nav_projects()} />
	</span>

	<div
		bind:this={stage}
		class="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 text-center"
	>
		<!-- the icon and the title are one object, centred as a whole -->
		<div class="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-6">
			<!-- the place the icon travels to -->
			<div bind:this={anchor} class="flex shrink-0 justify-center">
				<div class="size-24 md:size-40"></div>
			</div>

			<div class="translate-y-[10%]">
				<h1
					class="hero-fly text-6xl leading-none font-medium tracking-[-0.04em] text-text md:text-8xl"
					style="--d: 880ms"
				>
					krkr<span class="text-[var(--accent-clay)]">-</span>rs
				</h1>
			</div>
		</div>

		<div class="hero-fly flex flex-wrap items-center justify-center gap-4" style="--d: 1000ms">
			<!-- primary: the accent of the icon becomes the background of the
			     button, so the accent reads the same in light and dark mode -->
			<a
				href={downloadUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 rounded-md border border-transparent bg-[var(--accent-clay)] px-7 py-3 text-xs font-light tracking-wider text-bg transition-all hover:opacity-90 active:opacity-80"
			>
				<span>{m.krkr_hero_cta_download()}</span>
				<span class="icon-[heroicons--arrow-down-tray-20-solid] size-4"></span>
			</a>
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 rounded-md border border-border bg-fg px-7 py-3 text-xs font-light tracking-wider text-text transition-all hover:border-text"
			>
				<span>{m.krkr_hero_cta_source()}</span>
				<span class="icon-[octicon--mark-github-24] size-4"></span>
			</a>
		</div>

		<!-- the travelling icon -->
		<div
			bind:this={iconWrap}
			class="hero-icon pointer-events-none absolute z-10"
			style="left: {iconLeft}; top: {iconTop}; transform: translate(-50%, -50%) scale({iconScale}); opacity: {iconOpacity};"
		>
			<img
				src={icon}
				alt="krkr-rs"
				class="size-24 rounded-2xl shadow-[0_24px_60px_-18px_rgba(0,0,0,0.5)] md:size-40"
			/>
		</div>
	</div>
</section>

<style>
	/* the text is invisible until it flies out of the icon */
	.hero-return {
		animation: hero-fly 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: var(--d, 0ms);
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-return {
			animation: none;
			opacity: 1;
			filter: none;
			transform: none;
		}
	}
</style>
