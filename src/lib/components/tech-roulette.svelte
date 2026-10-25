<script lang="ts">
	import {
		languageIcons,
		frontendIcons,
		backendIcons,
		devopsIcons,
		gameDevIcons,
		type TechIcon
	} from '$lib/data/tech-icons-data';
	import { prefersReducedMotion } from 'svelte/motion';
	import { onMount } from 'svelte';
	import * as m from '$paraglide/messages.js';

	interface Entry {
		icon: TechIcon;
		/** the stack the technology belongs to */
		stack: string;
	}

	const stacks = [
		{ label: m.main_tech_languages(), icons: languageIcons },
		{ label: m.main_tech_frontend(), icons: frontendIcons },
		{ label: m.main_tech_backend(), icons: backendIcons },
		{ label: m.main_tech_devops(), icons: devopsIcons },
		{ label: m.main_tech_game_dev(), icons: gameDevIcons }
	];

	const entries: Entry[] = stacks.flatMap((stack) =>
		stack.icons.map((icon) => ({ icon, stack: stack.label }))
	);

	let reel: HTMLElement | undefined;
	let tiles: HTMLElement[] = [];

	/** the fractional index of the tile under the marker */
	let position = 0;
	/** the tile the marker is sitting on */
	let active = -1;
	/** the tile the visitor landed on */
	let selected = $state(0);
	let spinning = $state(false);

	/** how long a spin takes */
	const DURATION = 2600;

	/** the positions of the tiles are written straight to the DOM — the reel
	 *  moves far too often to go through the reactive graph */
	function paint() {
		const width = tiles[0]?.offsetWidth ?? 132;
		const centre = (reel?.clientWidth ?? 0) / 2;
		const count = entries.length;

		tiles.forEach((tile, i) => {
			// the reel is endless: a tile that leaves on one side reappears on
			// the other, always off screen
			let rel = i - position;
			while (rel >= count / 2) rel -= count;
			while (rel < -count / 2) rel += count;
			tile.style.transform = `translate3d(${centre - width / 2 + rel * width}px, 0, 0)`;
		});

		const index = ((Math.round(position) % count) + count) % count;
		if (index !== active) {
			tiles[active]?.classList.remove('is-active');
			active = index;
			tiles[active]?.classList.add('is-active');
		}
	}

	function spin() {
		if (spinning) return;

		const count = entries.length;
		const target = Math.floor(Math.random() * count);
		const laps = 3 + Math.floor(Math.random() * 2);
		const from = position;
		// the reel may sit between two tiles — the spin starts from the
		// nearest one and lands exactly on the target
		const fromIndex = Math.round(from);
		const steps = (((target - fromIndex) % count) + count) % count;
		const distance = laps * count + steps - (from - fromIndex);

		if (prefersReducedMotion.current) {
			position = target;
			selected = target;
			paint();
			return;
		}

		spinning = true;
		const start = performance.now();

		const step = (now: number) => {
			const t = Math.min(1, (now - start) / DURATION);
			const eased = 1 - Math.pow(1 - t, 5);
			// a small wobble as the reel settles
			position = from + distance * eased + Math.sin(t * Math.PI * 8) * 0.05 * (1 - t);
			paint();

			if (t < 1) {
				requestAnimationFrame(step);
			} else {
				// the reel stops exactly on the tile
				position = fromIndex + laps * count + steps;
				selected = target;
				spinning = false;
				paint();
			}
		};

		requestAnimationFrame(step);
	}

	onMount(() => {
		paint();

		const observer = new ResizeObserver(() => paint());
		if (reel) observer.observe(reel);

		// the reel gives itself its first spin when it comes into view
		let hasSpun = false;
		const watcher = new IntersectionObserver(
			(entries) => {
				if (hasSpun) return;
				if (entries.some((entry) => entry.isIntersecting)) {
					hasSpun = true;
					watcher.disconnect();
					setTimeout(spin, 400);
				}
			},
			{ threshold: 0.4 }
		);
		if (reel) watcher.observe(reel);

		return () => {
			observer.disconnect();
			watcher.disconnect();
		};
	});
</script>

<div class="flex w-full flex-col">
	<!-- the control -->
	<div class="mb-6 flex items-center justify-end">
		<button
			type="button"
			title="Spin"
			aria-label="Spin"
			onclick={spin}
			class="flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border bg-bg text-text/50 transition-all hover:border-text hover:text-text active:border-2 active:border-text"
		>
			<span class="icon-[heroicons--arrow-path-20-solid] size-4"></span>
		</button>
	</div>

	<!-- the reel -->
	<div
		bind:this={reel}
		class="group relative h-40 w-full cursor-pointer overflow-hidden select-none"
		role="button"
		tabindex="0"
		aria-label={m.main_section_tech_stacks()}
		onclick={spin}
		onkeydown={(event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				spin();
			}
		}}
	>
		{#each entries as entry, i (entry.icon.label)}
			<div bind:this={tiles[i]} class="roulette-tile absolute top-0 h-full w-[132px]">
				<div
					class="roulette-tile-inner flex h-full flex-col items-center justify-center gap-3 transition-transform duration-200 ease-out"
				>
					<img
						src={entry.icon.src}
						alt=""
						class="{entry.icon.className} size-8 object-contain"
						draggable="false"
					/>
					<span
						class="roulette-label text-[10px] font-light tracking-[0.18em] text-text/45 uppercase"
					>
						{entry.icon.label}
					</span>
				</div>
			</div>
		{/each}

		<!-- the marker: the payline the reel stops on -->
		<div
			class="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--accent-clay)]/45"
		></div>
		<span
			class="pointer-events-none absolute top-0 left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--accent-clay)]"
		></span>
		<span
			class="pointer-events-none absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rotate-45 bg-[var(--accent-clay)]"
		></span>

		<!-- the edges fade into the page -->
		<div
			class="pointer-events-none absolute inset-0 bg-linear-to-r from-bg via-transparent to-bg"
		></div>
	</div>

	<!-- the landed technology -->
	<div class="mt-10 flex flex-col items-center gap-3 text-center" aria-live="polite">
		<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
			{entries[selected].stack}
		</span>
		<h3 class="text-3xl font-light tracking-wider text-text md:text-4xl">
			{entries[selected].icon.label}
		</h3>
	</div>
</div>

<style>
	:global(.roulette-tile.is-active) :global(.roulette-tile-inner) {
		transform: scale(1.08);
	}

	:global(.roulette-tile.is-active) :global(.roulette-label) {
		color: var(--accent-clay);
	}
</style>
