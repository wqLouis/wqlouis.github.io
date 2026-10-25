<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import {
		languageIcons,
		frontendIcons,
		backendIcons,
		devopsIcons,
		gameDevIcons,
		type TechIcon
	} from '$lib/data/tech-icons-data';
	import { Spring, prefersReducedMotion } from 'svelte/motion';
	import { onMount } from 'svelte';

	const avatar = 'https://avatars.githubusercontent.com/u/114333810?v=4';

	/* ------------------------------------------------------------------
	   The nodes live in a fixed 1200×880 user space — the physics, the
	   springs and the resting layout all use those units. The viewBox is a
	   camera on top of that space: it is fitted to whatever the nodes are
	   doing, so the graph may drift without ever leaving the frame.
	   ------------------------------------------------------------------ */
	const W = 1200;
	const H = 880;
	const CX = W / 2;
	const CY = H / 2;

	const CATEGORY_R = 196;
	/** how far the tech icons sit from their category — the room the
	 *  category label needs */
	const ICON_OFFSET = 148;
	const AVATAR_R = 52;
	const ICON_SIZE = 40;
	const ICON_R = 30;
	const ICON_STEP = 62;

	const DEADZONE = 120;
	const RADIUS = 320;

	/** the breathing room around the graph, in user units */
	const VIEW_PADDING = 26;
	/** the category label never renders smaller than this (CSS pixels) */
	const LABEL_MIN_PX = 13;
	/** … and never grows beyond this (user units) */
	const LABEL_MAX = 36;
	/** the letter spacing of the label, in user units */
	const LABEL_TRACKING = 1.4;
	/** how fast the camera catches up with the graph */
	const VIEW_EASE = 0.14;
	/** the zoom limits */
	const ZOOM_MIN = 0.6;
	const ZOOM_MAX = 2.4;
	/** how far the graph may be pushed out of the frame */
	const PAN_SLACK = 40;

	const stacks: { key: string; label: string; icons: TechIcon[] }[] = [
		{ key: 'languages', label: m.main_tech_languages(), icons: languageIcons },
		{ key: 'frontend', label: m.main_tech_frontend(), icons: frontendIcons },
		{ key: 'backend', label: m.main_tech_backend(), icons: backendIcons },
		{ key: 'devops', label: m.main_tech_devops(), icons: devopsIcons },
		{ key: 'gamedev', label: m.main_tech_game_dev(), icons: gameDevIcons }
	];

	type Node = { x: number; y: number; vx: number; vy: number };
	type ViewBox = { x: number; y: number; w: number; h: number };

	const categories = stacks.map((stack, i) => ({ ...stack, index: 1 + i }));

	const icons: { icon: TechIcon; stack: number; index: number }[] = [];
	stacks.forEach((stack, s) => {
		stack.icons.forEach((icon) => {
			icons.push({ icon, stack: s, index: 1 + categories.length + icons.length });
		});
	});

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
				const x = bx + along * Math.cos(angle + Math.PI / 2) + ICON_OFFSET * Math.cos(angle);
				const y = by + along * Math.sin(angle + Math.PI / 2) + ICON_OFFSET * Math.sin(angle);
				list.push({ x, y, vx: 0, vy: 0 });
			});
		});

		return list;
	}

	/** the resting layout — the avatar in the middle, the branches radiating out */
	const home = layout();

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

	/** which branch a node belongs to — looked up, never searched */
	// eslint-disable-next-line svelte/prefer-svelte-reactivity -- a static lookup, not state
	const toneByIndex = new Map<number, string>();
	categories.forEach((category) => toneByIndex.set(category.index, category.key));
	icons.forEach((entry) => toneByIndex.set(entry.index, stacks[entry.stack].key));

	let nodes = $state<Node[]>(home.map((node) => ({ ...node })));
	let active = $state<string | null>(null);

	/** the cursor is smoothed by a spring, so the pull feels elastic */
	const pointer = new Spring({ x: CX, y: CY }, { stiffness: 0.14, damping: 0.85 });
	let pointerActive = $state(false);

	let svgEl: SVGSVGElement | undefined = $state();
	let shellEl: HTMLDivElement | undefined = $state();

	/** the size of the canvas, in CSS pixels */
	let box = $state({ width: 720, height: 480 });

	/** the camera — the slice of the physics space the canvas shows */
	let view = $state<ViewBox>(fitView(home, 1.5));

	/** the view can be zoomed and dragged around */
	let zoom = $state(1);
	let pan = $state({ x: 0, y: 0 });
	let dragging = $state(false);
	let dragOrigin = { x: 0, y: 0, panX: 0, panY: 0 };

	/** the physics only runs while the canvas is on screen and the tab is open */
	let onScreen = $state(false);
	let tabVisible = $state(true);

	/** the bounding box of everything that is drawn, in user units */
	function bounds(list: Node[]) {
		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;

		const grow = (x: number, y: number, r: number) => {
			minX = Math.min(minX, x - r);
			minY = Math.min(minY, y - r);
			maxX = Math.max(maxX, x + r);
			maxY = Math.max(maxY, y + r);
		};

		grow(list[0].x, list[0].y, AVATAR_R);
		for (let i = 1; i <= categories.length; i++) grow(list[i].x, list[i].y, 46);
		for (const entry of icons) grow(list[entry.index].x, list[entry.index].y, ICON_R);

		return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
	}

	/**
	 * The camera: the graph is fitted into the canvas, the spare room is
	 * spread evenly so the drawing stays centred. The aspect always
	 * follows the canvas, so the two axes share one scale and nothing is
	 * ever letterboxed.
	 */
	function fitView(list: Node[], aspect: number): ViewBox {
		const b = bounds(list);
		const w = Math.max(b.w, b.h * aspect) + VIEW_PADDING * 2;
		const h = w / aspect;
		return {
			x: b.x + b.w / 2 - w / 2,
			y: b.y + b.h / 2 - h / 2,
			w,
			h
		};
	}

	/**
	 * The zoom and the pan are camera moves: they shrink the window on the
	 * physics space around its centre. The drawing itself is never
	 * transformed, so the pointer maths stays a plain viewBox mapping.
	 */
	function zoomView(v: ViewBox, z: number, p: { x: number; y: number }): ViewBox {
		const w = v.w / z;
		const h = v.h / z;
		return {
			x: v.x + v.w / 2 - w / 2 + p.x,
			y: v.y + v.h / 2 - h / 2 + p.y,
			w,
			h
		};
	}

	/** the size of the category pill — the label decides how wide it gets */
	function labelBox(label: string, fontSize: number) {
		return {
			width: label.length * (fontSize * 0.66 + LABEL_TRACKING) + 22,
			height: fontSize * 1.8
		};
	}

	/** the zoom and the pan are camera moves — they never touch the drawing */
	const camera = $derived(zoomView(view, zoom, pan));

	/** CSS pixels per user unit — how small the drawing really is */
	const scale = $derived(box.width / view.w);

	/** the label is sized in user units so it stays legible at any zoom */
	const labelSize = $derived(Math.min(LABEL_MAX, Math.max(LABEL_MIN_PX, LABEL_MIN_PX / scale)));

	const viewBox = $derived(
		`${camera.x.toFixed(2)} ${camera.y.toFixed(2)} ${camera.w.toFixed(2)} ${camera.h.toFixed(2)}`
	);

	/** client coordinates → user units of the current viewBox */
	function toUser(event: PointerEvent) {
		const rect = svgEl?.getBoundingClientRect();
		if (!rect) return { x: 0, y: 0 };
		return {
			x: camera.x + (event.clientX - rect.left) * (camera.w / rect.width),
			y: camera.y + (event.clientY - rect.top) * (camera.h / rect.height)
		};
	}

	function pointerMove(event: PointerEvent) {
		if (!svgEl) return;
		// a finger scrolls the page — it never drags the graph around
		if (event.pointerType === 'touch') return;

		const rect = svgEl.getBoundingClientRect();

		if (dragging) {
			pan = {
				x: dragOrigin.panX + (event.clientX - dragOrigin.x) * (camera.w / rect.width),
				y: dragOrigin.panY + (event.clientY - dragOrigin.y) * (camera.h / rect.height)
			};
			clampPan();
		}

		// the pointer lives in the same space as the nodes
		const u = toUser(event);
		pointer.set({ x: u.x, y: u.y });
		pointerActive = true;
	}

	function pointerLeave() {
		pointerActive = false;
	}

	function pointerDown(event: PointerEvent) {
		// only a mouse or a pen may move the graph
		if (event.pointerType === 'touch') return;
		dragging = true;
		dragOrigin = { x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y };
		svgEl?.setPointerCapture(event.pointerId);
	}

	function pointerUp() {
		dragging = false;
	}

	function clampPan() {
		const maxX = (view.w * Math.abs(1 - 1 / zoom)) / 2 + PAN_SLACK;
		const maxY = (view.h * Math.abs(1 - 1 / zoom)) / 2 + PAN_SLACK;
		pan = {
			x: Math.min(maxX, Math.max(-maxX, pan.x)),
			y: Math.min(maxY, Math.max(-maxY, pan.y))
		};
	}

	function zoomBy(delta: number) {
		zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Number((zoom + delta).toFixed(2))));
		clampPan();
	}

	function resetView() {
		zoom = 1;
		pan = { x: 0, y: 0 };
	}

	onMount(() => {
		// the canvas size drives the camera
		const resize = new ResizeObserver((entries) => {
			const rect = entries[0]?.contentRect;
			if (!rect || rect.width <= 0 || rect.height <= 0) return;
			box = { width: rect.width, height: rect.height };
			if (prefersReducedMotion.current) {
				view = fitView(nodes, rect.width / rect.height);
			}
		});
		if (svgEl) resize.observe(svgEl);

		// the physics may only run while the canvas is actually on screen
		const visibility = new IntersectionObserver(
			(entries) => {
				onScreen = entries.some((entry) => entry.isIntersecting);
			},
			{ threshold: 0.01 }
		);
		if (shellEl) visibility.observe(shellEl);

		const onVisibilityChange = () => {
			tabVisible = !document.hidden;
		};
		document.addEventListener('visibilitychange', onVisibilityChange);

		return () => {
			resize.disconnect();
			visibility.disconnect();
			document.removeEventListener('visibilitychange', onVisibilityChange);
		};
	});

	$effect(() => {
		if (prefersReducedMotion.current) return;
		// no point in simulating a graph nobody can see
		if (!onScreen || !tabVisible) return;

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

			// the camera follows the graph — eased, so it never jitters
			const aspect = box.width / box.height;
			const target = fitView(nodes, aspect);
			const w = view.w + (target.w - view.w) * VIEW_EASE;
			view = {
				x: view.x + (target.x - view.x) * VIEW_EASE,
				y: view.y + (target.y - view.y) * VIEW_EASE,
				w,
				h: w / aspect
			};

			frame = requestAnimationFrame(step);
		};

		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	});

	/** which branch a node belongs to */
	function toneOf(index: number) {
		return toneByIndex.get(index);
	}

	function stringPath(a: Node, b: Node) {
		const distance = Math.hypot(b.x - a.x, b.y - a.y);
		const sag = Math.max(-18, Math.min(18, (distance - 90) * 0.5));
		const midY = (a.y + b.y) / 2 + sag;
		return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
	}
</script>

<div class="mx-auto w-full max-w-[1240px]">
	<div
		bind:this={shellEl}
		class="relative w-full overflow-hidden rounded-lg border border-border bg-fg/70"
	>
		<!-- technical grid -->
		<div
			class="pointer-events-none absolute inset-0 opacity-30"
			style="background-image: linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px); background-size: 40px 40px;"
		></div>

		<svg
			bind:this={svgEl}
			{viewBox}
			preserveAspectRatio="xMidYMid meet"
			class="relative block h-[clamp(320px,78vw,760px)] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
			onpointermove={pointerMove}
			onpointerleave={pointerLeave}
			onpointerdown={pointerDown}
			onpointerup={pointerUp}
			onpointercancel={pointerUp}
			onlostpointercapture={pointerUp}
			role="img"
			aria-label={m.main_section_tech_stacks()}
		>
			<defs>
				<clipPath id="tech-avatar">
					<circle cx={nodes[0].x} cy={nodes[0].y} r={AVATAR_R} />
				</clipPath>
			</defs>

			<g>
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
						preserveAspectRatio="xMidYMid slice"
						clip-path="url(#tech-avatar)"
					/>
				</g>

				<!-- the categories -->
				{#each categories as category, i (category.key)}
					{@const node = nodes[category.index]}
					{@const pill = labelBox(category.label, labelSize)}
					<g
						class="tech-graph-node"
						style="--d: {i * 80}ms"
						onmouseenter={() => (active = category.key)}
						onmouseleave={() => (active = null)}
						role="presentation"
					>
						<rect
							x={node.x - pill.width / 2}
							y={node.y - pill.height / 2}
							width={pill.width}
							height={pill.height}
							rx={pill.height / 2}
							fill="var(--background)"
							stroke={active === category.key ? 'var(--accent-clay)' : 'var(--border)'}
							stroke-width={active === category.key ? 1.5 : 1}
						/>
						<text
							x={node.x}
							y={node.y + labelSize * 0.35}
							font-size={labelSize}
							letter-spacing={LABEL_TRACKING}
							text-anchor="middle"
							fill="var(--text)"
							opacity="0.85"
							paint-order="stroke"
							stroke="var(--background)"
							stroke-width={labelSize * 0.3}
							stroke-linejoin="round"
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

		<!-- the view controls — on small screens they sit below the canvas -->
		<div class="z-20 flex justify-end gap-1.5 p-2 sm:absolute sm:top-3 sm:right-3 sm:p-0">
			<button
				type="button"
				title={m.main_tech_zoom_in()}
				aria-label={m.main_tech_zoom_in()}
				onclick={() => zoomBy(0.2)}
				onpointerdown={(event) => event.stopPropagation()}
				class="flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border bg-bg text-sm text-text/60 transition-all hover:border-text hover:text-text"
			>
				+
			</button>
			<button
				type="button"
				title={m.main_tech_zoom_out()}
				aria-label={m.main_tech_zoom_out()}
				onclick={() => zoomBy(-0.2)}
				onpointerdown={(event) => event.stopPropagation()}
				class="flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border bg-bg text-sm text-text/60 transition-all hover:border-text hover:text-text"
			>
				−
			</button>
			<button
				type="button"
				title={m.main_tech_reset_view()}
				aria-label={m.main_tech_reset_view()}
				onclick={resetView}
				onpointerdown={(event) => event.stopPropagation()}
				class="flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border bg-bg text-[11px] text-text/60 transition-all hover:border-text hover:text-text"
			>
				⟲
			</button>
		</div>
	</div>

	<p class="mt-2 text-right text-xs font-light tracking-wide text-text/50">
		{m.main_tech_drag_hint()}
	</p>

	<!-- the same information, in plain text, for the screen readers -->
	<ul class="sr-only">
		{#each stacks as stack (stack.key)}
			<li>
				{stack.label}
				<ul>
					{#each stack.icons as icon (icon.src)}
						<li>{icon.label}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
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
