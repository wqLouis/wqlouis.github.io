<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import { prefersReducedMotion } from 'svelte/motion';
	import icon from '$lib/assets/gamedev/krkr-rs.svg';

	const githubUrl = 'https://github.com/wqLouis/krkr-rs';

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

<section class="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-24 md:px-10">
	<!-- swiss grid -->
	<div
		class="pointer-events-none absolute inset-0 opacity-45"
		style="background-image:
			repeating-linear-gradient(to bottom, var(--border) 0 1px, transparent 1px 112px),
			repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px 8.3333%);"
	></div>

	<a
		href="/projects"
		title={m.krkr_nav_projects()}
		class="hero-return absolute top-7 left-6 z-20 flex size-9 items-center justify-center rounded-full bg-text text-bg transition-opacity hover:opacity-80 md:left-10"
		style="--d: 1000ms"
	>
		<span class="icon-[heroicons--arrow-left-20-solid] size-4"></span>
	</a>

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
			<a
				href="#build"
				class="flex items-center gap-2 rounded-md border border-transparent bg-accent px-7 py-3 text-xs font-light tracking-wider text-white transition-all hover:opacity-90 active:opacity-80"
			>
				<span>{m.krkr_hero_cta_build()}</span>
				<span class="icon-[heroicons--arrow-right-20-solid] size-4"></span>
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
			class="krkr-icon pointer-events-none absolute z-10"
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

	.krkr-icon {
		transition:
			left 0.9s cubic-bezier(0.22, 1, 0.36, 1),
			top 0.9s cubic-bezier(0.22, 1, 0.36, 1),
			transform 0.9s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.6s ease;
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-return {
			animation: none;
			opacity: 1;
			filter: none;
			transform: none;
		}

		.krkr-icon {
			transition: none;
		}
	}
</style>
