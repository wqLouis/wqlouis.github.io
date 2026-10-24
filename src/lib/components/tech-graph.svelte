<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import {
		languageIcons,
		frontendIcons,
		backendIcons,
		devopsIcons,
		gameDevIcons
	} from '$lib/data/tech-icons-data';
	import { Spring, prefersReducedMotion } from 'svelte/motion';

	const avatar = 'https://avatars.githubusercontent.com/u/114333810?v=4';

	const W = 1200;
	const H = 880;
	const CX = W / 2;
	const CY = H / 2;

	const CATEGORY_R = 196;
	const CATEGORY_SIZE = 76;
	const AVATAR_R = 52;
	const ICON_SIZE = 40;
	const ICON_R = 30;
	const ICON_STEP = 62;
	const TAIL_REST = 100;

	const DEADZONE = 120;
	const RADIUS = 320;

	const stacks = [
		{
			key: 'languages',
			label: m.main_tech_languages(),
			icons: languageIcons,
			tone: 'var(--accent-clay)'
		},
		{
			key: 'frontend',
			label: m.main_tech_frontend(),
			icons: frontendIcons,
			tone: 'var(--accent-sand)'
		},
		{
			key: 'backend',
			label: m.main_tech_backend(),
			icons: backendIcons,
			tone: 'var(--accent-pine)'
		},
		{
			key: 'devops',
			label: m.main_tech_devops(),
			icons: devopsIcons,
			tone: 'var(--accent-clay)'
		},
		{
			key: 'gamedev',
			label: m.main_tech_game_dev(),
			icons: gameDevIcons,
			tone: 'var(--accent-sand)'
		}
	];

	type Node = { x: number; y: number; vx: number; vy: number };

	const categories = stacks.map((stack, i) => ({ ...stack, index: 1 + i }));

	const icons: { icon: (typeof languageIcons)[number]; stack: number; index: number }[] = [];
	stacks.forEach((stack, s) => {
		stack.icons.forEach((icon) => {
			icons.push({ icon, stack: s, index: 1 + categories.length + icons.length });
		});
	});

	/** the resting layout — the avatar in the middle, the branches radiating out */
	const home = layout();

	let nodes = $state<Node[]>(home.map((node) => ({ ...node })));
	let active = $state<string | null>(null);

	/** the resting layout — the avatar in the middle, the branches radiating out */
	function layout() {
		const list: Node[] = [{ x: CX, y: CY, vx: 0, vy: 0 }];

		categories.forEach((category, i) => {
			const angle = (-90 + (i * 360) / stacks.length) * (Math.PI / 180);
			list.push({
				x: CX + CATEGORY_R * Math.cos(angle),
				y: CY + CATEGORY_R * Math.sin(angle),
				vx: 0,
				vy: 0
			});
		});

		stacks.forEach((stack, s) => {
			const angle = (-90 + (s * 360) / stacks.length) * (Math.PI / 180);
			const bx = CX + CATEGORY_R * Math.cos(angle);
			const by = CY + CATEGORY_R * Math.sin(angle);
			const start = -((stack.icons.length - 1) * ICON_STEP) / 2;

			stack.icons.forEach((icon, j) => {
				const along = start + j * ICON_STEP;
				const x = bx + along * Math.cos(angle + Math.PI / 2) + 108 * Math.cos(angle);
				const y = by + along * Math.sin(angle + Math.PI / 2) + 108 * Math.sin(angle);
				list.push({ x, y, vx: 0, vy: 0 });
			});
		});

		return list;
	}

	/** the strings: avatar → category, and every tech item → its category */
	const springs = (() => {
		const list: { a: number; b: number; rest: number }[] = [];
		categories.forEach((category, i) => {
			list.push({ a: 0, b: 1 + i, rest: CATEGORY_R });
		});
		icons.forEach((entry) => {
			const a = home[1 + entry.stack];
			const b = home[entry.index];
			list.push({
				a: 1 + entry.stack,
				b: entry.index,
				rest: Math.hypot(b.x - a.x, b.y - a.y)
			});
		});
		return list;
	})();

	/** the cursor is smoothed by a spring, so the pull feels elastic */
	const pointer = new Spring({ x: CX, y: CY }, { stiffness: 0.14, damping: 0.85 });
	let pointerActive = $state(false);
	let svgEl: SVGSVGElement | undefined = $state();

	/** the view can be zoomed and dragged around */
	let zoom = $state(1);
	let pan = $state({ x: 0, y: 0 });
	let dragging = $state(false);
	let dragOrigin = { x: 0, y: 0, panX: 0, panY: 0 };

	const userScale = () => (svgEl ? svgEl.getBoundingClientRect().width / W : 1);

	function pointerMove(event: PointerEvent) {
		if (!svgEl) return;
		const rect = svgEl.getBoundingClientRect();
		const scale = rect.width / W;

		if (dragging) {
			pan = {
				x: dragOrigin.panX + (event.clientX - dragOrigin.x) / scale,
				y: dragOrigin.panY + (event.clientY - dragOrigin.y) / scale
			};
		}

		pointer.set({
			x: (event.clientX - rect.left) / scale - pan.x,
			y: (event.clientY - rect.top) / scale - pan.y
		});
		pointer.set({ x: pointer.current.x / zoom, y: pointer.current.y / zoom });
		pointerActive = true;
	}

	function pointerLeave() {
		pointerActive = false;
	}

	function pointerDown(event: PointerEvent) {
		dragging = true;
		dragOrigin = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
		(event.target as Element).setPointerCapture?.(event.pointerId);
	}

	function pointerUp() {
		dragging = false;
	}

	function zoomBy(delta: number) {
		zoom = Math.min(2.4, Math.max(0.6, Number((zoom + delta).toFixed(2))));
	}

	function resetView() {
		zoom = 1;
		pan = { x: 0, y: 0 };
	}

	$effect(() => {
		if (prefersReducedMotion.current) return;

		let frame = 0;

		const step = () => {
			for (let i = 1; i < nodes.length; i++) {
				const node = nodes[i];

				// pull back towards the resting layout
				node.vx += (home[i].x - node.x) * 0.0016;
				node.vy += (home[i].y - node.y) * 0.0016;

				// gravity
				node.vy += 0.012;

				// the cursor leans the graph towards it, with a dead zone
				if (pointerActive) {
					const dx = pointer.current.x - node.x;
					const dy = pointer.current.y - node.y;
					const distance = Math.hypot(dx, dy) || 1;
					if (distance > DEADZONE && distance < RADIUS) {
						const falloff = (1 - (distance - DEADZONE) / (RADIUS - DEADZONE)) ** 2;
						node.vx += (dx / distance) * falloff * 0.16;
						node.vy += (dy / distance) * falloff * 0.16;
					}
				}

				node.vx *= 0.93;
				node.vy *= 0.93;
			}

			// the elastic strings
			for (const spring of springs) {
				const a = nodes[spring.a];
				const b = nodes[spring.b];
				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const distance = Math.hypot(dx, dy) || 1;
				const force = (distance - spring.rest) * 0.006;
				const ux = dx / distance;
				const uy = dy / distance;

				if (spring.a !== 0) {
					a.vx += ux * force;
					a.vy += uy * force;
				}
				b.vx -= ux * force;
				b.vy -= uy * force;
			}

			for (let i = 1; i < nodes.length; i++) {
				const node = nodes[i];
				node.x += node.vx;
				node.y += node.vy;
			}

			frame = requestAnimationFrame(step);
		};

		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	});

	/** which branch a node belongs to */
	function toneOf(index: number) {
		if (index <= categories.length) return categories[index - 1]?.key;
		const entry = icons.find((item) => item.index === index);
		return entry ? stacks[entry.stack].key : undefined;
	}

	function stringPath(a: Node, b: Node) {
		const distance = Math.hypot(b.x - a.x, b.y - a.y);
		const sag = Math.max(-18, Math.min(18, (distance - 90) * 0.5));
		const midY = (a.y + b.y) / 2 + sag;
		return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
	}
</script>

<div class="mx-auto w-full overflow-x-auto pb-4">
	<div
		class="relative mx-auto w-full max-w-[1240px] min-w-[820px] overflow-hidden rounded-lg border border-border bg-fg/70"
	>
		<!-- technical grid -->
		<div
			class="pointer-events-none absolute inset-0 opacity-30"
			style="background-image: linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px); background-size: 40px 40px;"
		></div>

		<!-- the view controls -->
		<div class="absolute top-3 right-3 z-20 flex gap-1.5">
			<button
				type="button"
				title="Zoom in"
				onclick={() => zoomBy(0.2)}
				onpointerdown={(event) => event.stopPropagation()}
				class="flex size-8 cursor-pointer items-center justify-center rounded-sm border border-border bg-bg text-sm text-text/60 transition-all hover:border-text hover:text-text"
			>
				+
			</button>
			<button
				type="button"
				title="Zoom out"
				onclick={() => zoomBy(-0.2)}
				onpointerdown={(event) => event.stopPropagation()}
				class="flex size-8 cursor-pointer items-center justify-center rounded-sm border border-border bg-bg text-sm text-text/60 transition-all hover:border-text hover:text-text"
			>
				−
			</button>
			<button
				type="button"
				title="Reset view"
				onclick={resetView}
				onpointerdown={(event) => event.stopPropagation()}
				class="flex size-8 cursor-pointer items-center justify-center rounded-sm border border-border bg-bg text-[11px] text-text/60 transition-all hover:border-text hover:text-text"
			>
				⟲
			</button>
		</div>

		<svg
			bind:this={svgEl}
			viewBox="0 0 {W} {H}"
			class="relative block w-full cursor-grab touch-none active:cursor-grabbing"
			onpointermove={pointerMove}
			onpointerleave={pointerLeave}
			onpointerdown={pointerDown}
			onpointerup={pointerUp}
			onpointercancel={pointerUp}
			role="img"
			aria-label={m.main_section_tech_stacks()}
		>
			<defs>
				<clipPath id="tech-avatar">
					<circle cx={CX} cy={CY} r={AVATAR_R} />
				</clipPath>
			</defs>

			<g transform="translate({pan.x} {pan.y}) scale({zoom})">
				<!-- the strings -->
				{#each springs as spring, i (i)}
					{@const a = nodes[spring.a]}
					{@const b = nodes[spring.b]}
					{@const tone = toneOf(spring.b)}
					<path
						d={stringPath(a, b)}
						fill="none"
						stroke={active && active === tone ? 'var(--accent-clay)' : 'var(--border)'}
						stroke-width={active && active === tone ? 1.4 : 1}
						class="tech-graph-link"
						style="--d: {i * 30}ms"
					/>
				{/each}

				<!-- the root -->
				<g>
					<circle
						cx={nodes[0].x}
						cy={nodes[0].y}
						r={AVATAR_R}
						fill="var(--background)"
						stroke="var(--border)"
						stroke-width="1"
					/>
					<image
						href={avatar}
						x={nodes[0].x - AVATAR_R}
						y={nodes[0].y - AVATAR_R}
						width={AVATAR_R * 2}
						height={AVATAR_R * 2}
						clip-path="url(#tech-avatar)"
					/>
				</g>

				<!-- the categories -->
				{#each categories as category, i (category.key)}
					{@const node = nodes[category.index]}
					<g
						class="tech-graph-node"
						style="--d: {i * 80}ms"
						onmouseenter={() => (active = category.key)}
						onmouseleave={() => (active = null)}
						role="group"
						aria-label={category.label}
					>
						<circle
							cx={node.x}
							cy={node.y}
							r={CATEGORY_SIZE / 2}
							fill="var(--background)"
							stroke={active === category.key ? 'var(--accent-clay)' : 'var(--border)'}
							stroke-width={active === category.key ? 1.5 : 1}
						/>
						<text
							x={node.x}
							y={node.y + 4}
							font-size="11"
							letter-spacing="1.4"
							text-anchor="middle"
							fill="var(--text)"
							opacity="0.85"
						>
							{category.label.toUpperCase()}
						</text>
					</g>
				{/each}

				<!-- the tech -->
				{#each icons as entry, i (entry.icon.src)}
					{@const node = nodes[entry.index]}
					{@const stack = stacks[entry.stack]}
					<g
						class="tech-graph-node"
						style="--d: {200 + i * 40}ms"
						onmouseenter={() => (active = stack.key)}
						onmouseleave={() => (active = null)}
						role="presentation"
					>
						<circle
							cx={node.x}
							cy={node.y}
							r={ICON_R}
							fill="var(--background)"
							stroke={active === stack.key ? 'var(--accent-clay)' : 'var(--border)'}
							stroke-width={active === stack.key ? 1.5 : 1}
						/>
						<image
							href={entry.icon.src}
							x={node.x - ICON_SIZE / 2}
							y={node.y - ICON_SIZE / 2}
							width={ICON_SIZE}
							height={ICON_SIZE}
							preserveAspectRatio="xMidYMid meet"
							class={entry.icon.className || ''}
						/>
					</g>
				{/each}
			</g>
		</svg>
	</div>
</div>

<style>
	.tech-graph-link {
		stroke-dasharray: 7 6;
		animation: tech-dash 1.2s linear infinite;
		transition:
			stroke 0.3s ease,
			stroke-width 0.3s ease;
	}

	.tech-graph-node {
		opacity: 0;
		animation: tech-pop 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: var(--d, 0ms);
	}

	@keyframes tech-dash {
		to {
			stroke-dashoffset: -26;
		}
	}

	@keyframes tech-pop {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tech-graph-link,
		.tech-graph-node {
			animation: none;
			opacity: 1;
		}
	}
</style>
