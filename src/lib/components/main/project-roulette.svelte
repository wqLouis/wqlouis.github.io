<script lang="ts">
	import ProjectCard from './card.svelte';
	import { projects } from '$lib/data/projects-data';
	import * as m from '$paraglide/messages.js';

	const COUNT = projects.length;
	/** the angle between two pockets */
	const STEP = 360 / COUNT;
	/** how fast the wheel turns while the cursor drags it */
	const DRAG = 0.4;

	let wheel: HTMLElement | undefined;
	let ring: HTMLElement | undefined;
	let pockets: HTMLElement[] = [];

	/** the rotation of the wheel, in degrees */
	let angle = 0;
	/** the pocket that faces the pointer */
	let active = $state(0);
	let dragging = $state(false);
	let startX = 0;
	let startAngle = 0;
	let lastX = 0;
	let lastTime = 0;
	/** the speed of the throw, in degrees per millisecond */
	let velocity = 0;
	/** how much the wheel has travelled before it turns a pocket */
	let travel = 0;
	let frame = 0;

	/** paints the wheel — the track turns and every pocket finds its place */
	function paint() {
		if (!ring) return;

		ring.style.transform = `rotate(${angle}deg)`;

		const front = ((Math.round(-angle / STEP) % COUNT) + COUNT) % COUNT;
		if (front !== active) active = front;

		pockets.forEach((pocket, i) => {
			const a = i * STEP;
			// the pocket stands on the circle and stays upright
			pocket.style.transform = `rotate(${a}deg) translateY(calc(-1 * var(--radius))) rotate(${-(a + angle)}deg) scale(var(--scale)) translate(-50%, -50%)`;

			// how far it stands from the pointer
			let delta = (a + angle) % 360;
			if (delta > 180) delta -= 360;
			if (delta < -180) delta += 360;

			const distance = Math.abs(delta);
			const blur = Math.min(1, distance / 95) * 8;

			pocket.style.filter = blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : 'none';
			pocket.style.opacity = Math.max(0.12, 1 - distance / 220).toFixed(2);
			pocket.style.zIndex = String(100 - Math.round(distance));
		});
	}

	/** turns the wheel to an angle, with a spin on the way */
	function animateTo(target: number, duration = 800, turns = 1) {
		const start = angle;
		const end = target + turns * 360;
		const t0 = performance.now();

		const step = (now: number) => {
			const t = Math.min(1, (now - t0) / duration);
			const eased = 1 - Math.pow(1 - t, 3);
			angle = start + (end - start) * eased;
			paint();

			if (t < 1) {
				frame = requestAnimationFrame(step);
			} else {
				frame = 0;
				angle = end % 360;
				paint();
			}
		};

		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(step);
	}

	/** the wheel moves on to the next pocket */
	function stepPocket(direction: 1 | -1) {
		const position = -angle / STEP;
		const next = Math.round(position) + direction;
		animateTo(-next * STEP, 700, 1);
	}

	/** the wheel is thrown and coasts to a stop on a pocket */
	function coast() {
		const t0 = performance.now();

		const step = (now: number) => {
			const dt = Math.max(1, now - t0);
			angle += velocity * dt;
			velocity *= 0.94;

			if (Math.abs(velocity) > 0.002) {
				paint();
				frame = requestAnimationFrame((time) => step(time));
			} else {
				frame = 0;
				// settle on the pocket that is in front
				const position = -angle / STEP;
				animateTo(-Math.round(position) * STEP, 420, 0);
			}
		};

		frame = requestAnimationFrame((now) => step(now));
	}

	function onPointerDown(event: PointerEvent) {
		if (event.button !== 0 || !wheel) return;
		cancelAnimationFrame(frame);
		frame = 0;
		dragging = true;
		startX = event.clientX;
		startAngle = angle;
		lastX = event.clientX;
		lastTime = performance.now();
		velocity = 0;
		wheel.setPointerCapture(event.pointerId);
	}

	function onPointerMove(event: PointerEvent) {
		if (!dragging) return;

		const dx = event.clientX - startX;
		angle = startAngle + dx * DRAG;

		const now = performance.now();
		const dt = Math.max(1, now - lastTime);
		velocity = ((event.clientX - lastX) * DRAG) / dt;
		lastX = event.clientX;
		lastTime = now;

		paint();
	}

	function onPointerUp(event: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		if (wheel?.hasPointerCapture(event.pointerId)) wheel.releasePointerCapture(event.pointerId);
		coast();
	}

	/* the wheel turns as the page is scrolled */
	function onWheel(event: WheelEvent) {
		if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
		event.preventDefault();
		travel += event.deltaY;

		if (Math.abs(travel) > 60) {
			stepPocket(travel > 0 ? 1 : -1);
			travel = 0;
		}
	}
</script>

<div class="roulette relative w-full">
	<div
		class="wheel"
		bind:this={wheel}
		class:is-dragging={dragging}
		role="region"
		aria-label={m.main_section_projects()}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		onwheel={onWheel}
	>
		<div class="ring" bind:this={ring}>
			<!-- the flat circle the pockets ride on -->
			<div class="track"></div>

			{#each projects as project, i (project.cardTitle)}
				<div class="pocket" style="--i: {i}" bind:this={pockets[i]}>
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

			<!-- the tick that shows the track turning -->
			<div class="tick"></div>
		</div>

		<!-- the pointer that marks the winning pocket -->
		<span class="pointer"></span>
	</div>
</div>

<style>
	.roulette {
		--card-w: 260px;
		--card-h: 300px;
		--scale: 0.6;
		--radius: 200px;
	}

	@media (min-width: 768px) {
		.roulette {
			--card-w: 340px;
			--card-h: 300px;
			--scale: 0.85;
			--radius: 300px;
		}
	}

	/* the wheel */
	.wheel {
		position: relative;
		margin-inline: auto;
		width: calc(2 * var(--radius) + var(--card-w) * var(--scale));
		height: calc(2 * var(--radius) + var(--card-h) * var(--scale));
		cursor: grab;
	}

	.wheel.is-dragging {
		cursor: grabbing;
	}

	/* the ring turns around the centre of the circle */
	.ring {
		position: absolute;
		inset: 0;
		transform-origin: center calc(var(--radius) + (var(--card-h) * var(--scale)) / 2);
	}

	/* the flat circle the pockets ride on */
	.track {
		position: absolute;
		top: calc(var(--radius) + (var(--card-h) * var(--scale)) / 2);
		left: 50%;
		width: calc(2 * var(--radius));
		height: calc(2 * var(--radius));
		transform: translate(-50%, -50%);
		border: 1px solid var(--border);
		border-radius: 50%;
		opacity: 0.5;
	}

	/* the tick on the track, it turns with the wheel */
	.tick {
		position: absolute;
		top: calc(var(--radius) + (var(--card-h) * var(--scale)) / 2);
		left: 50%;
		width: 1px;
		height: calc(var(--radius) - 12px);
		transform-origin: top center;
		transform: translateX(-50%);
		background: linear-gradient(to bottom, var(--accent-clay), transparent);
		opacity: 0.75;
	}

	/* one pocket of the wheel */
	.pocket {
		position: absolute;
		top: calc(var(--radius) + (var(--card-h) * var(--scale)) / 2);
		left: 50%;
		width: var(--card-w);
		will-change: transform, filter, opacity;
	}

	/* the pockets float free — the wheel has no frame around it */
	.pocket :global(a) {
		border-color: transparent;
	}

	/* the pointer above the wheel */
	.pointer {
		position: absolute;
		top: 2px;
		left: 50%;
		width: 10px;
		height: 10px;
		transform: translateX(-50%) rotate(45deg);
		background: var(--accent-clay);
	}
</style>
