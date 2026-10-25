<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import { onMount } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { reveal } from '$lib/utils/reveal';

	const W = 1080;
	const H = 480;
	const NODE_W = 232;
	const NODE_H = 58;
	const REST = 88;
	const COLUMN_X = W / 2;
	const DEADZONE = 130;
	const RADIUS = 300;

	const layers = [
		{
			name: m.krkr_arch_layers_0_name(),
			desc: m.krkr_arch_layers_0_desc(),
			tone: 'clay',
			kind: 'vm host',
			deps: 'TJS2 VM · GC · bytecode'
		},
		{
			name: m.krkr_arch_layers_1_name(),
			desc: m.krkr_arch_layers_1_desc(),
			tone: 'sand',
			kind: 'compatibility surface',
			deps: 'native classes · KAG · plugins'
		},
		{
			name: m.krkr_arch_layers_2_name(),
			desc: m.krkr_arch_layers_2_desc(),
			tone: 'pine',
			kind: 'game engine',
			deps: 'layers · bitmaps · sound · timers'
		},
		{
			name: m.krkr_arch_layers_3_name(),
			desc: m.krkr_arch_layers_3_desc(),
			tone: 'clay',
			kind: 'platform core',
			deps: 'fs · media · render · vulkan'
		}
	];

	const root = {
		name: m.krkr_arch_layers_4_name(),
		desc: m.krkr_arch_layers_4_desc(),
		tone: 'pine',
		kind: 'composition root',
		deps: 'desktop · android'
	};

	type Node = { x: number; y: number; vx: number; vy: number };

	let nodes = $state<Node[]>(
		layers.map((_, i) => ({ x: COLUMN_X, y: 64 + i * REST, vx: 0, vy: 0 }))
	);

	// the composition root is pinned — it never swings and is never attracted
	const rootNode: Node = { x: COLUMN_X, y: 64 + layers.length * REST, vx: 0, vy: 0 };

	/** the card under the cursor — only highlighted, it never opens the panel */
	let highlighted = $state<number | null>(null);
	/** the inspected card */
	let linkIndex = $state<number | null>(null);
	/** whether the panel is open */
	let open = $state(false);

	let pointer = { x: COLUMN_X, y: H / 2, active: false };

	let stage = $state<HTMLDivElement | undefined>();
	let slot = $state<HTMLDivElement | undefined>();
	let view = $state<HTMLDivElement | undefined>();
	let svg = $state<SVGSVGElement | undefined>();
	let panelBody = $state<HTMLDivElement | undefined>();

	/** the height of the panel — animated on open, swap and close */
	let panelHeight = $state(0);

	let geometry = $state({
		panelRight: 0,
		panelY: 0,
		svgLeft: 0,
		svgTop: 0,
		scale: 1
	});

	function select(index: number) {
		if (open && linkIndex === index) {
			// close — the panel shrinks and the line disconnects
			open = false;
			setTimeout(() => {
				if (!open) linkIndex = null;
			}, 420);
			return;
		}
		linkIndex = index;
		open = true;
	}

	$effect(() => {
		// keep the panel at the height of its content
		if (!open || !panelBody) {
			panelHeight = 0;
			return;
		}

		panelHeight = panelBody.offsetHeight;
		const observer = new ResizeObserver(() => {
			if (panelBody) panelHeight = panelBody.offsetHeight;
		});
		observer.observe(panelBody);
		return () => observer.disconnect();
	});

	function measure(panelOpen = true) {
		if (!stage || !slot || !svg) return;
		const stageRect = stage.getBoundingClientRect();
		const slotRect = slot.getBoundingClientRect();
		const svgRect = svg.getBoundingClientRect();

		geometry = {
			// while the panel is closed the slot has no width — the connector
			// is not drawn then, so its edge does not matter
			panelRight: panelOpen ? slotRect.right - stageRect.left : slotRect.left - stageRect.left,
			panelY: slotRect.top + slotRect.height / 2 - stageRect.top,
			svgLeft: svgRect.left - stageRect.left,
			svgTop: svgRect.top - stageRect.top,
			scale: svgRect.width / W
		};
	}

	$effect(() => {
		/* the panel state is read here so the effect re-runs whenever the
		   panel opens or the inspected card changes */
		measure(open || linkIndex !== null);

		const onResize = () => measure();
		window.addEventListener('resize', onResize);
		window.addEventListener('scroll', onResize, true);

		const observer =
			typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => measure()) : null;
		if (stage) observer?.observe(stage);
		if (slot) observer?.observe(slot);
		if (view) observer?.observe(view);

		return () => {
			window.removeEventListener('resize', onResize);
			window.removeEventListener('scroll', onResize, true);
			observer?.disconnect();
		};
	});

	function pointerMove(event: PointerEvent) {
		if (!svg) return;
		const rect = svg.getBoundingClientRect();
		pointer.x = ((event.clientX - rect.left) / rect.width) * W;
		pointer.y = ((event.clientY - rect.top) / rect.height) * H;
		pointer.active = true;
	}

	function pointerLeave() {
		pointer.active = false;
	}

	onMount(() => {
		if (prefersReducedMotion.current) return;

		let frame = 0;

		const step = () => {
			// ── forces ────────────────────────────────────────────────
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];

				// pull back to the resting column
				node.vx += (COLUMN_X - node.x) * 0.003;
				node.vy += (64 + i * REST - node.y) * 0.003;

				// gravity
				node.vy += 0.02;

				// the cursor leans the rig towards it — weak, and with a dead
				// zone so a card never chases the pointer
				if (pointer.active) {
					const dx = pointer.x - node.x;
					const dy = pointer.y - node.y;
					const distance = Math.hypot(dx, dy) || 1;
					if (distance > DEADZONE && distance < RADIUS) {
						const falloff = (1 - (distance - DEADZONE) / (RADIUS - DEADZONE)) ** 2;
						node.vx += (dx / distance) * falloff * 0.13;
						node.vy += (dy / distance) * falloff * 0.13;
					}
				}

				node.vx *= 0.9;
				node.vy *= 0.9;
			}

			// ── elastic strings (variable length) ────────────────────
			for (let i = 0; i < nodes.length; i++) {
				const a = nodes[i];
				const b = i + 1 < nodes.length ? nodes[i + 1] : rootNode;
				const pinned = b === rootNode;

				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const distance = Math.hypot(dx, dy) || 1;
				const force = (distance - REST) * 0.004;
				const ux = dx / distance;
				const uy = dy / distance;

				a.vx += ux * force;
				a.vy += uy * force;
				if (!pinned) {
					b.vx -= ux * force;
					b.vy -= uy * force;
				}
			}

			// ── integrate ────────────────────────────────────────────
			for (const node of nodes) {
				node.x += node.vx;
				node.y += node.vy;
				node.x = Math.min(W - NODE_W / 2 - 8, Math.max(NODE_W / 2 + 8, node.x));
				node.y = Math.min(H - NODE_H / 2 - 8, Math.max(NODE_H / 2 + 8, node.y));
			}

			frame = requestAnimationFrame(step);
		};

		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	});

	function stringPath(a: Node, b: Node) {
		// the strings are elastic: a slack string sags, a stretched one goes taut
		const distance = Math.hypot(b.x - a.x, b.y - a.y);
		const sag = Math.max(-16, Math.min(16, (REST - distance) * 1.6));
		const midY = (a.y + b.y) / 2 + sag;
		return `M ${a.x} ${a.y} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y}`;
	}

	/** the link runs from the panel (fixed, outside the view) to the inspected card */
	function linkPath(index: number) {
		const node = nodes[index];
		const x1 = geometry.panelRight;
		const y1 = geometry.panelY;
		const x2 = geometry.svgLeft + (node.x - NODE_W / 2) * geometry.scale;
		const y2 = geometry.svgTop + node.y * geometry.scale;
		const mid = (x1 + x2) / 2;
		return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
	}

	function linkEnd(index: number) {
		const node = nodes[index];
		return {
			x: geometry.svgLeft + (node.x - NODE_W / 2) * geometry.scale,
			y: geometry.svgTop + node.y * geometry.scale
		};
	}
</script>

<section id="architecture" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.krkr_arch_kicker()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.krkr_arch_title()}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<div class="mt-10" use:reveal={{ delay: 120 }}>
			<div bind:this={stage} class="krkr-stage relative flex min-w-0" class:is-open={open}>
				<!-- the inspection panel lives outside the view, in its own slot -->
				<div bind:this={slot} class="krkr-slot">
					<div class="krkr-panel" style="height: {panelHeight}px">
						<div class="krkr-panel-clip">
							{#if linkIndex !== null}
								{@const layer = layers[linkIndex]}
								<div bind:this={panelBody} class="krkr-panel-body">
									<div class="flex items-center justify-between">
										<span class="text-[11px] tracking-[0.18em] text-[var(--accent-clay)] uppercase">
											{layer.name}
										</span>
										<span
											class="flex items-center gap-1 text-[9px] tracking-[0.18em] text-text/40 uppercase"
										>
											<span class="size-1.5 animate-pulse rounded-full bg-[var(--accent-sand)]"
											></span>
											online
										</span>
									</div>

									<div class="mt-2 h-px w-full bg-border/60"></div>

									<p class="mt-3 text-[11px] leading-relaxed tracking-wide text-text/70">
										{layer.desc}
									</p>

									<div class="mt-3 space-y-1 font-mono text-[10px] tracking-wide text-text/45">
										<div class="flex justify-between gap-3">
											<span>TYPE</span>
											<span class="text-right text-text/70">{layer.kind}</span>
										</div>
										<div class="flex justify-between gap-3">
											<span>UNITS</span>
											<span class="text-right text-text/70">{layer.deps}</span>
										</div>
										<div class="flex justify-between gap-3">
											<span>FLOW</span>
											<span class="text-right text-text/70">↓ dependency</span>
										</div>
									</div>

									<div class="mt-3 flex items-center gap-1 text-[10px] text-text/40">
										<span>{'█'.repeat(6)}</span>
										<span class="animate-pulse">▍</span>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- the view -->
				<div
					bind:this={view}
					class="krkr-view relative min-w-0 flex-1 overflow-hidden rounded-lg border border-border bg-fg/70"
				>
					<!-- technical grid -->
					<div
						class="pointer-events-none absolute inset-0 opacity-30"
						style="background-image: linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px); background-size: 40px 40px;"
					></div>

					<div
						class="relative h-full"
						onpointermove={pointerMove}
						onpointerleave={pointerLeave}
						role="presentation"
					>
						<div class="krkr-scroller">
							<div class="krkr-canvas relative">
								<svg
									bind:this={svg}
									viewBox="0 0 {W} {H}"
									class="relative block touch-none"
									style="width: max(100cqw, 760px); aspect-ratio: {W} / {H}"
									role="img"
									aria-label={m.krkr_arch_title()}
								>
									<!-- elastic strings -->
									{#each layers as layer, i (layer.name)}
										{#if i > 0}
											<path
												d={stringPath(nodes[i - 1], nodes[i])}
												fill="none"
												stroke="var(--border)"
												stroke-width="1.5"
											/>
										{/if}
									{/each}

									<!-- string to the pinned root -->
									<path
										d={stringPath(nodes[nodes.length - 1], rootNode)}
										fill="none"
										stroke="var(--border)"
										stroke-width="1.5"
										stroke-dasharray="4 5"
									/>

									<!-- layers -->
									{#each layers as layer, i (layer.name)}
										{@const active = highlighted === i || linkIndex === i}
										<g
											transform="translate({nodes[i].x - NODE_W / 2}, {nodes[i].y - NODE_H / 2})"
											class="cursor-pointer"
											role="button"
											tabindex="0"
											aria-label={layer.name}
											aria-pressed={linkIndex === i}
											onmouseenter={() => (highlighted = i)}
											onmouseleave={() => (highlighted = highlighted === i ? null : highlighted)}
											onfocus={() => (highlighted = i)}
											onblur={() => (highlighted = highlighted === i ? null : highlighted)}
											onclick={() => select(i)}
											onkeydown={(event) => {
												if (event.key === 'Enter' || event.key === ' ') {
													event.preventDefault();
													select(i);
												}
											}}
										>
											<rect
												width={NODE_W}
												height={NODE_H}
												rx="14"
												fill="var(--background)"
												stroke={active ? 'var(--accent-clay)' : 'var(--border)'}
												stroke-width={active ? 1.5 : 1}
											/>
											<circle
												cx="24"
												cy={NODE_H / 2}
												r={active ? 5 : 4}
												class={layer.tone === 'clay'
													? 'fill-[var(--accent-clay)]'
													: layer.tone === 'sand'
														? 'fill-[var(--accent-sand)]'
														: 'fill-[var(--accent-pine)]'}
											/>
											<text
												x="40"
												y="27"
												font-size="13"
												font-weight="500"
												letter-spacing="1"
												fill="var(--text)"
											>
												{layer.name}
											</text>
											<text
												x="40"
												y="43"
												font-size="9.5"
												letter-spacing="1.6"
												fill="var(--text)"
												opacity="0.55"
											>
												{layer.kind.toUpperCase()}
											</text>
											<text
												x={NODE_W - 20}
												y="34"
												font-size="11"
												text-anchor="end"
												fill="var(--text)"
												opacity={active ? 0.6 : 0.35}
											>
												0{i + 1}
											</text>
										</g>
									{/each}

									<!-- pinned composition root -->
									<g transform="translate({rootNode.x - NODE_W / 2}, {rootNode.y - NODE_H / 2})">
										<rect
											width={NODE_W}
											height={NODE_H}
											rx="14"
											fill="var(--background)"
											stroke="var(--border)"
											stroke-width="1"
											stroke-dasharray="5 4"
										/>
										<circle cx="24" cy={NODE_H / 2} r="4" fill="var(--accent-pine)" opacity="0.6" />
										<text
											x="40"
											y="27"
											font-size="13"
											font-weight="500"
											letter-spacing="1"
											fill="var(--text)"
											opacity="0.8"
										>
											{root.name}
										</text>
										<text
											x="40"
											y="43"
											font-size="9.5"
											letter-spacing="1.6"
											fill="var(--text)"
											opacity="0.45"
										>
											{root.kind.toUpperCase()}
										</text>
										<text
											x={NODE_W - 20}
											y="34"
											font-size="11"
											text-anchor="end"
											fill="var(--text)"
											opacity="0.3"
										>
											PIN
										</text>
									</g>
								</svg>
							</div>
						</div>
					</div>
				</div>

				<!-- the connector lives on the stage so it reaches the panel -->
				<svg class="krkr-wires pointer-events-none absolute inset-0 z-5 h-full w-full">
					{#if linkIndex !== null}
						{@const end = linkEnd(linkIndex)}
						{#key linkIndex}
							<path
								d={linkPath(linkIndex)}
								pathLength="1"
								fill="none"
								stroke="var(--accent-clay)"
								stroke-width="1.25"
								class={open ? 'krkr-link-in' : 'krkr-link-out'}
							/>
						{/key}
						<circle cx={end.x} cy={end.y} r="3" fill="var(--accent-clay)" />
						<circle
							cx={geometry.panelRight}
							cy={geometry.panelY}
							r="3.5"
							fill="none"
							stroke="var(--accent-clay)"
							stroke-width="1.25"
						/>
					{/if}
				</svg>
			</div>
		</div>
	</div>
</section>

<style>
	/* the stage holds the panel slot and the view — the panel pushes the view right */
	.krkr-stage {
		container-type: inline-size;
		gap: 0;
		transition: gap 0.5s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.krkr-stage.is-open {
		gap: 24px;
	}

	.krkr-slot {
		position: relative;
		z-index: 10;
		flex: 0 0 auto;
		width: 0;
		transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.krkr-stage.is-open .krkr-slot {
		width: 320px;
	}

	.krkr-panel {
		position: absolute;
		top: 50%;
		left: 0;
		width: 320px;
		overflow: hidden;
		border-radius: 0.5rem;
		border: 1px solid var(--border);
		background: color-mix(in srgb, var(--background) 95%, transparent);
		box-shadow: 0 18px 50px -12px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(6px);
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;

		opacity: 0;
		filter: blur(8px);
		transform: translate(-110%, -50%);
		transition:
			height 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.35s ease,
			filter 0.35s ease,
			transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.krkr-stage.is-open .krkr-panel {
		opacity: 1;
		filter: blur(0);
		transform: translate(0, -50%);
	}

	.krkr-panel-clip {
		overflow: hidden;
	}

	.krkr-panel-body {
		padding: 1rem;
	}

	.krkr-view {
		z-index: 1;
	}

	.krkr-wires {
		z-index: 5;
	}

	.krkr-scroller {
		overflow-x: auto;
		overflow-y: hidden;
	}

	@media (min-width: 1024px) {
		/* the view keeps its scale — the extra width is cropped on both sides
		   so the drawing stays centred inside the narrowed view */
		.krkr-scroller {
			overflow-x: clip;
		}

		.krkr-canvas {
			margin-left: calc((100% - 100cqw) / 2);
		}
	}

	/* the line connects and disconnects */
	.krkr-link-in {
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		animation: krkr-draw 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	.krkr-link-out {
		stroke-dasharray: 1;
		stroke-dashoffset: 0;
		animation: krkr-undraw 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	@keyframes krkr-draw {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes krkr-undraw {
		to {
			stroke-dashoffset: 1;
		}
	}

	@media (max-width: 1023px) {
		/* no room for a side panel — it becomes a sheet over the view */
		.krkr-stage.is-open .krkr-slot {
			width: 0;
		}

		.krkr-stage.is-open {
			gap: 0;
		}

		.krkr-panel {
			top: auto;
			bottom: 12px;
			left: 12px;
			width: calc(100% - 24px);
			transform: translateY(16px);
		}

		.krkr-stage.is-open .krkr-panel {
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.krkr-stage,
		.krkr-slot,
		.krkr-panel {
			transition: none;
		}

		.krkr-link-in,
		.krkr-link-out {
			animation: none;
		}

		.krkr-link-out {
			stroke-dashoffset: 1;
		}
	}
</style>
