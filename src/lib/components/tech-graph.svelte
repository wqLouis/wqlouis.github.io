<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import {
		languageIcons,
		frontendIcons,
		backendIcons,
		devopsIcons,
		gameDevIcons
	} from '$lib/data/tech-icons-data';

	const avatar = 'https://avatars.githubusercontent.com/u/114333810?v=4';

	const W = 1200;
	const H = 400;
	const ICON = 40;
	const ICON_GAP = 8;
	const COL_GAP = 52;

	const AVATAR_Y = 70;
	const BUS_Y = 156;
	const CATEGORY_Y = 208;
	const ICON_BUS_Y = 292;
	const ICON_Y = 336;

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

	const rowWidth = (count: number) => count * ICON + (count - 1) * ICON_GAP;
	const total =
		stacks.reduce((sum, stack) => sum + rowWidth(stack.icons.length), 0) +
		COL_GAP * (stacks.length - 1);

	/** the columns are laid out left to right, centred as a whole */
	let cursor = (W - total) / 2;
	const columns = stacks.map((stack) => {
		const width = rowWidth(stack.icons.length);
		const column = { ...stack, x: cursor + width / 2, width };
		cursor += width + COL_GAP;
		return column;
	});

	let active = $state<string | null>(null);

	const iconX = (column: (typeof columns)[number], index: number) =>
		column.x - ((column.icons.length - 1) * (ICON + ICON_GAP)) / 2 + index * (ICON + ICON_GAP);

	const firstX = columns[0].x;
	const lastX = columns[columns.length - 1].x;
</script>

<div class="mx-auto w-full overflow-x-auto pb-4">
	<div
		class="relative mx-auto w-full max-w-[1240px] min-w-[900px] overflow-hidden rounded-lg border border-border bg-fg/70"
	>
		<!-- technical grid -->
		<div
			class="pointer-events-none absolute inset-0 opacity-30"
			style="background-image: linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px); background-size: 40px 40px;"
		></div>

		<svg
			viewBox="0 0 {W} {H}"
			class="relative block w-full"
			role="img"
			aria-label={m.main_section_tech_stacks()}
		>
			<defs>
				<clipPath id="tech-avatar">
					<circle cx={W / 2} cy={AVATAR_Y} r="34" />
				</clipPath>
			</defs>

			<!-- the trunk -->
			<path
				d="M {W / 2} {AVATAR_Y + 34} L {W / 2} {BUS_Y}"
				pathLength="1"
				fill="none"
				stroke="var(--border)"
				stroke-width="1"
				class="tech-graph-link"
				style="--d: 0ms"
			/>
			<path
				d="M {firstX} {BUS_Y} L {lastX} {BUS_Y}"
				pathLength="1"
				fill="none"
				stroke="var(--border)"
				stroke-width="1"
				class="tech-graph-link"
				style="--d: 120ms"
			/>

			<!-- the centre -->
			<g class="tech-graph-node" style="--d: 0ms">
				<circle
					cx={W / 2}
					cy={AVATAR_Y}
					r="34"
					fill="var(--background)"
					stroke="var(--border)"
					stroke-width="1"
				/>
				<image
					href={avatar}
					x={W / 2 - 34}
					y={AVATAR_Y - 34}
					width="68"
					height="68"
					clip-path="url(#tech-avatar)"
				/>
			</g>

			{#each columns as column, i (column.key)}
				<!-- the branch to the category -->
				<path
					d="M {column.x} {BUS_Y} L {column.x} {CATEGORY_Y - 24}"
					pathLength="1"
					fill="none"
					stroke={active === column.key ? 'var(--accent-clay)' : 'var(--border)'}
					stroke-width={active === column.key ? 1.6 : 1}
					class="tech-graph-link"
					style="--d: {240 + i * 70}ms"
				/>

				<!-- the category -->
				<g
					class="tech-graph-node"
					style="--d: {300 + i * 70}ms"
					onmouseenter={() => (active = column.key)}
					onmouseleave={() => (active = null)}
					role="group"
					aria-label={column.label}
				>
					<rect
						x={column.x - 104}
						y={CATEGORY_Y - 24}
						width="208"
						height="48"
						rx="14"
						fill="var(--background)"
						stroke={active === column.key ? 'var(--accent-clay)' : 'var(--border)'}
						stroke-width={active === column.key ? 1.5 : 1}
					/>
					<circle cx={column.x - 82} cy={CATEGORY_Y} r="4" fill={column.tone} />
					<text
						x={column.x - 68}
						y={CATEGORY_Y + 4}
						font-size="11"
						letter-spacing="2"
						fill="var(--text)"
						opacity="0.75"
					>
						{column.label.toUpperCase()}
					</text>
				</g>

				<!-- the branch to the tech -->
				<path
					d="M {column.x} {CATEGORY_Y + 24} L {column.x} {ICON_BUS_Y}"
					pathLength="1"
					fill="none"
					stroke={active === column.key ? 'var(--accent-clay)' : 'var(--border)'}
					stroke-width={active === column.key ? 1.6 : 1}
					class="tech-graph-link"
					style="--d: {360 + i * 70}ms"
				/>
				<path
					d="M {iconX(column, 0)} {ICON_BUS_Y} L {iconX(
						column,
						column.icons.length - 1
					)} {ICON_BUS_Y}"
					pathLength="1"
					fill="none"
					stroke={active === column.key ? 'var(--accent-clay)' : 'var(--border)'}
					stroke-width={active === column.key ? 1.6 : 1}
					class="tech-graph-link"
					style="--d: {420 + i * 70}ms"
				/>

				{#each column.icons as icon, j (icon.src)}
					{@const cx = iconX(column, j)}
					<path
						d="M {cx} {ICON_BUS_Y} L {cx} {ICON_Y - 20}"
						pathLength="1"
						fill="none"
						stroke={active === column.key ? 'var(--accent-clay)' : 'var(--border)'}
						stroke-width={active === column.key ? 1.6 : 1}
						class="tech-graph-link"
						style="--d: {480 + i * 70 + j * 30}ms"
					/>
					<g
						class="tech-graph-node"
						style="--d: {520 + i * 70 + j * 30}ms"
						onmouseenter={() => (active = column.key)}
						onmouseleave={() => (active = null)}
						role="presentation"
					>
						<circle
							{cx}
							cy={ICON_Y}
							r="20"
							fill="var(--background)"
							stroke={active === column.key ? 'var(--accent-clay)' : 'var(--border)'}
							stroke-width={active === column.key ? 1.5 : 1}
						/>
						<image
							href={icon.src}
							x={cx - 11}
							y={ICON_Y - 11}
							width="22"
							height="22"
							preserveAspectRatio="xMidYMid meet"
							class={icon.className || ''}
						/>
					</g>
				{/each}
			{/each}
		</svg>
	</div>
</div>

<style>
	/* the links draw themselves in, like in the layer graph */
	.tech-graph-link {
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		animation: tech-draw 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
		animation-delay: var(--d, 0ms);
		transition:
			stroke 0.3s ease,
			stroke-width 0.3s ease;
	}

	.tech-graph-node {
		opacity: 0;
		animation: tech-pop 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
		animation-delay: var(--d, 0ms);
	}

	@keyframes tech-draw {
		to {
			stroke-dashoffset: 0;
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
			stroke-dashoffset: 0;
		}
	}
</style>
