<script lang="ts">
	import ProjectCard from './card.svelte';
	import { projects } from '$lib/data/projects-data';
	import * as m from '$paraglide/messages.js';

	let strip: HTMLElement | undefined;
	/** the card that sits in the middle of the reel */
	let active = $state(0);
	let frame = 0;
	let dragging = $state(false);
	let startX = 0;
	let startScroll = 0;
	/** how much the wheel has travelled before the reel moves on */
	let wheel = 0;

	function cards(): HTMLElement[] {
		return strip ? Array.from(strip.querySelectorAll<HTMLElement>('[data-card]')) : [];
	}

	function measure() {
		if (!strip) return;

		const centre = strip.scrollLeft + strip.clientWidth / 2;
		let closest = 0;
		let distance = Infinity;

		cards().forEach((card, i) => {
			const middle = card.offsetLeft + card.offsetWidth / 2;
			const gap = Math.abs(middle - centre);
			if (gap < distance) {
				distance = gap;
				closest = i;
			}
		});

		if (closest !== active) active = closest;
	}

	function onScroll() {
		if (frame) return;
		frame = requestAnimationFrame(() => {
			frame = 0;
			measure();
		});
	}

	/** brings a card into the middle of the reel */
	function go(index: number) {
		if (!strip) return;
		const card = cards()[index];
		if (!card) return;
		// the reel itself scrolls — the page is never touched
		const left = card.offsetLeft + card.offsetWidth / 2 - strip.clientWidth / 2;
		strip.scrollTo({ left, behavior: 'smooth' });
	}

	function step(direction: 1 | -1) {
		go(Math.min(projects.length - 1, Math.max(0, active + direction)));
	}

	/* ------------------------------------------------------------------
	   Dragging with the cursor: the reel follows the pointer and settles
	   on the card that ends up in the middle.
	   ------------------------------------------------------------------ */
	function onPointerDown(event: PointerEvent) {
		if (event.button !== 0 || !strip) return;
		dragging = true;
		startX = event.clientX;
		startScroll = strip.scrollLeft;
		strip.setPointerCapture(event.pointerId);
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging || !strip) return;
		strip.scrollLeft = startScroll - (event.clientX - startX);
	}

	function onPointerUp(event: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		if (strip?.hasPointerCapture(event.pointerId)) strip.releasePointerCapture(event.pointerId);
		settle();
	}

	/** the reel snaps to the card closest to the middle */
	function settle() {
		measure();
		go(active);
	}

	/* ------------------------------------------------------------------
	   Scrolling down over the reel walks through the cards. At the ends the
	   wheel is handed back to the page.
	   ------------------------------------------------------------------ */
	function onWheel(event: WheelEvent) {
		// a trackpad swipe is already horizontal — the browser handles it
		if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

		const last = projects.length - 1;
		if ((event.deltaY > 0 && active === last) || (event.deltaY < 0 && active === 0)) return;

		event.preventDefault();
		wheel += event.deltaY;

		if (Math.abs(wheel) > 60) {
			step(wheel > 0 ? 1 : -1);
			wheel = 0;
		}
	}
</script>

<div class="carousel relative w-[min(90vw,1120px)]">
	<div
		bind:this={strip}
		class="strip relative flex gap-5 overflow-x-auto"
		class:is-dragging={dragging}
		role="region"
		aria-label={m.main_section_projects()}
		onscroll={onScroll}
		onwheel={onWheel}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
	>
		{#each projects as project, i (project.cardTitle)}
			<div data-card class="card shrink-0 snap-center" class:is-active={i === active}>
				<ProjectCard
					link={project.link}
					cardTitle={project.cardTitle}
					image={project.image}
					tags={project.tags}
					fit={project.fit}
					index={String(i + 1).padStart(2, '0')}
					active={i === active}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.carousel {
		--card-w: 260px;
	}

	@media (min-width: 768px) {
		.carousel {
			--card-w: 340px;
		}
	}

	/* the reel — the first and the last card can both reach the middle */
	.strip {
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		padding-inline: calc((100% - var(--card-w)) / 2);
		scrollbar-width: none;
		cursor: grab;
		/* the page may still be scrolled vertically over the reel */
		touch-action: pan-y;
	}

	.strip::-webkit-scrollbar {
		display: none;
	}

	/* while the cursor holds the reel, the snapping steps aside */
	.strip.is-dragging {
		scroll-snap-type: none;
		scroll-behavior: auto;
		cursor: grabbing;
	}

	/* the cards away from the middle step back */
	.card {
		width: var(--card-w);
		opacity: 0.55;
		filter: blur(6px);
		transform: scale(0.95);
		transition:
			opacity 0.4s ease,
			filter 0.4s ease,
			transform 0.4s ease;
	}

	/* only the card in the middle is in focus */
	.card.is-active {
		opacity: 1;
		filter: blur(0);
		transform: scale(1);
	}
</style>
