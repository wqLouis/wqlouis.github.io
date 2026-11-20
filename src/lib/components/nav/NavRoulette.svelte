<script lang="ts">
	import { locale, type Locale } from '$lib/stores/locale-store';
	import { theme } from '$lib/stores/theme-store';
	import * as m from '$paraglide/messages.js';
	import { activate, localeWheel, navActions, type NavAction } from './nav-items';

	/** how long the finger has to rest before the wheel opens (ms) */
	const HOLD_MS = 380;
	/** the diameter of the button (px) */
	const FAB = 52;
	/** the gap between the button and the screen edge (px) */
	const INSET = 28;
	/** the radius of the first ring (px) */
	const ROOT_R = 120;
	/** the first ring runs from the left to the top (degrees, 0 = right, 90 = down) */
	const ROOT_FROM = 180;
	const ROOT_TO = 270;
	/** the radius of the second ring — it is centred on the language button (px) */
	const SUB_R = 58;
	/** the second ring is a short arc above the language button */
	const SUB_FROM = 210;
	const SUB_TO = 290;
	/** the band the second ring answers in (px) */
	const SUB_BAND = [40, 78];

	let { onopen, sheetopen = false }: { onopen: () => void; sheetopen?: boolean } = $props();

	// @ts-expect-error - paraglide generates exports with special characters
	const t = (key: string) => (m as Record<string, () => string>)[key]?.() ?? key;

	const actions = $derived(navActions(t, $theme, $locale));

	/** the five faces of the wheel, in the order they are laid out */
	const WHEEL: NavAction['id'][] = ['home', 'blogs', 'projects', 'theme', 'lang'];

	/** spreads n angles from `from` to `to` (both in degrees) */
	function fan(from: number, to: number, count: number) {
		const step = (to - from) / (count - 1);
		return Array.from({ length: count }, (_, i) => from + i * step);
	}

	const rootAngles = fan(ROOT_FROM, ROOT_TO, WHEEL.length);
	const subAngles = fan(SUB_FROM, SUB_TO, localeWheel.length);

	/* the geometry of the screen */
	let vw = $state(0);
	let vh = $state(0);
	let safeBottom = $state(0);
	let safeRight = $state(0);

	/** the centre of the button, in viewport coordinates */
	const cx = $derived(vw - INSET - safeRight - FAB / 2);
	const cy = $derived(vh - INSET - safeBottom - FAB / 2);

	let fab: HTMLButtonElement | undefined;
	let safeProbe: HTMLDivElement | undefined;

	function measure() {
		vw = window.innerWidth;
		vh = window.innerHeight;
		safeBottom = safeProbe?.clientHeight ?? 0;
		safeRight = safeProbe?.clientWidth ?? 0;
	}

	$effect(() => {
		measure();
		window.addEventListener('resize', measure);
		window.addEventListener('orientationchange', measure);
		return () => {
			window.removeEventListener('resize', measure);
			window.removeEventListener('orientationchange', measure);
		};
	});

	/* the state of the gesture */
	let pressing = $state(false);
	let open = $state(false);
	/** the wheel stays open and waits for a tap */
	let sticky = $state(false);
	let layer = $state<'root' | 'sub'>('root');
	let highlighted = $state<NavAction['id'] | null>(null);
	let subHighlighted = $state<Locale | null>(null);

	let startX = 0;
	let startY = 0;
	let holdTimer: ReturnType<typeof setTimeout> | undefined;

	function buzz(ms: number) {
		// a short tick — the phone may not have a motor, and that is fine
		navigator.vibrate?.(ms);
	}

	/**
	 * The browser sends a click after every tap. When the tap opens the
	 * sheet, that click lands on a row of the new sheet and takes an
	 * action the finger never asked for. The click that follows the
	 * gesture is swallowed here — only the one at the same spot.
	 */
	function swallowClick(x: number, y: number) {
		const stop = (event: MouseEvent) => {
			document.removeEventListener('click', stop, true);
			if (Math.abs(event.clientX - x) < 6 && Math.abs(event.clientY - y) < 6) {
				event.stopPropagation();
				event.preventDefault();
			}
		};
		document.addEventListener('click', stop, true);
		setTimeout(() => document.removeEventListener('click', stop, true), 300);
	}

	/** the items of the first ring */
	const rootItems = $derived(
		WHEEL.map((id, i) => {
			const action = actions.find((a) => a.id === id);
			const angle = rootAngles[i];
			return {
				id,
				action,
				angle,
				x: cx + ROOT_R * Math.cos((angle * Math.PI) / 180),
				y: cy + ROOT_R * Math.sin((angle * Math.PI) / 180)
			};
		})
	);

	/** the language button is the centre of the second ring */
	const langButton = $derived(rootItems.find((item) => item.id === 'lang')!);

	/** the items of the second ring — they stand on the language button */
	const subItems = $derived(
		localeWheel.map((entry, i) => {
			const angle = subAngles[i];
			return {
				...entry,
				angle,
				x: langButton.x + SUB_R * Math.cos((angle * Math.PI) / 180),
				y: langButton.y + SUB_R * Math.sin((angle * Math.PI) / 180)
			};
		})
	);

	/** the nearest wedge of a fan, or null when the pointer is out of reach */
	function pick(angles: number[], theta: number, radius: number, reach: number) {
		if (radius > reach) return null;
		let best: number | null = null;
		let bestDelta = Infinity;
		angles.forEach((angle, i) => {
			const delta = Math.abs(((theta - angle + 540) % 360) - 180);
			if (delta < bestDelta) {
				bestDelta = delta;
				best = i;
			}
		});
		// the gap between two wedges is not a wedge
		const step = angles[1] - angles[0];
		return best !== null && bestDelta <= step / 2 ? best : null;
	}

	/** the faces fan out of the button when the wheel opens */
	function faceTransform(x: number, y: number, isOpen: boolean) {
		if (isOpen) return 'transform: translate(-50%, -50%);';
		return `transform: translate(-50%, -50%) translate(${cx - x}px, ${cy - y}px) scale(0.35);`;
	}

	/** the second ring opens out of the language button */
	function subTransform(x: number, y: number, isOpen: boolean) {
		if (isOpen) return 'transform: translate(-50%, -50%);';
		return `transform: translate(-50%, -50%) translate(${langButton.x - x}px, ${
			langButton.y - y
		}px) scale(0.35);`;
	}

	/** the faces arrive one after the other, and leave the other way round */
	function faceDelay(index: number, isOpen: boolean, total: number) {
		return isOpen ? `${index * 45}ms` : `${(total - 1 - index) * 25}ms`;
	}

	/** the label hangs under its face — but it must never leave the screen */
	function labelStyle(x: number) {
		return x > vw - 72
			? 'left: 0; transform: translateX(-100%);'
			: 'left: 50%; transform: translateX(-50%);';
	}

	function track(x: number, y: number) {
		/* the second ring first: it stands on the language button */
		const sx = x - langButton.x;
		const sy = y - langButton.y;
		const sRadius = Math.hypot(sx, sy);
		if (sRadius >= SUB_BAND[0] && sRadius <= SUB_BAND[1]) {
			const sTheta = ((Math.atan2(sy, sx) * 180) / Math.PI + 360) % 360;
			const index = pick(subAngles, sTheta, sRadius, SUB_BAND[1]);
			if (index !== null) {
				const next = subItems[index].id;
				if (next !== subHighlighted) buzz(8);
				subHighlighted = next;
				layer = 'sub';
				highlighted = 'lang';
				return;
			}
		}

		/* otherwise the first ring */
		const dx = x - cx;
		const dy = y - cy;
		const radius = Math.hypot(dx, dy);
		const theta = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;

		layer = 'root';
		subHighlighted = null;
		const index = pick(rootAngles, theta, radius, ROOT_R + 40);
		const next = index === null ? null : (WHEEL[index] as NavAction['id']);
		if (next !== highlighted) buzz(8);
		highlighted = next;
	}

	/** closes the wheel */
	function close() {
		open = false;
		sticky = false;
		layer = 'root';
		highlighted = null;
		subHighlighted = null;
	}

	/** takes one of the faces — by a tap, when the wheel stands open */
	function pickFace(id: NavAction['id']) {
		const action = actions.find((a) => a.id === id);
		if (!action) return;
		if (action.id === 'lang') {
			// the second ring opens and waits for a tap
			open = true;
			sticky = true;
			layer = 'sub';
			return;
		}
		// only the wheel's own faces can be taken
		if (!WHEEL.includes(action.id)) return;
		activate(action);
		buzz(14);
		close();
	}

	/** takes one of the three languages */
	function pickLocale(id: Locale) {
		locale.set(id);
		buzz(14);
		close();
	}

	function onPointerDown(event: PointerEvent) {
		if (event.pointerType === 'mouse' && event.button !== 0) return;
		swallowClick(event.clientX, event.clientY);
		if (sticky) {
			// the wheel stands open — a press on the button puts it away
			close();
			return;
		}
		pressing = true;
		startX = event.clientX;
		startY = event.clientY;
		fab?.setPointerCapture(event.pointerId);
		clearTimeout(holdTimer);
		holdTimer = setTimeout(() => {
			open = true;
			buzz(12);
		}, HOLD_MS);
	}

	function onPointerMove(event: PointerEvent) {
		if (!pressing) return;
		if (!open) {
			// a hold that turns into a scroll is not a hold
			if (Math.hypot(event.clientX - startX, event.clientY - startY) > 12) {
				clearTimeout(holdTimer);
			}
			return;
		}
		track(event.clientX, event.clientY);
	}

	function onPointerUp(event: PointerEvent) {
		if (!pressing) return;
		pressing = false;
		clearTimeout(holdTimer);
		if (fab?.hasPointerCapture(event.pointerId)) fab.releasePointerCapture(event.pointerId);

		if (!open) {
			// a short tap opens the sheet — the plain, reachable way in
			onopen();
			return;
		}

		if (subHighlighted) {
			locale.set(subHighlighted);
			buzz(14);
			close();
			return;
		}

		const action = actions.find((a) => a.id === highlighted);
		highlighted = null;

		if (!action) {
			close();
			return;
		}

		if (action.id === 'lang') {
			// the second ring opens and waits for a tap
			open = true;
			sticky = true;
			layer = 'sub';
			return;
		}

		close();
		// only the wheel's own faces can be taken
		if (!WHEEL.includes(action.id)) return;
		activate(action);
		buzz(14);
	}

	function onPointerCancel() {
		pressing = false;
		clearTimeout(holdTimer);
		close();
	}
</script>

<!-- a probe that reports the safe area insets to the script -->
<div
	bind:this={safeProbe}
	class="pointer-events-none fixed bottom-0 left-0 h-0 w-0"
	style="padding-bottom: env(safe-area-inset-bottom, 0px); padding-right: env(safe-area-inset-right, 0px);"
></div>

<!--
	The wheel face of the navigation: one round button in the corner.
	Rest on it and the wheel opens — keep holding, slide onto the face you
	want and let go to take it. Let go on the language face and the second
	ring opens and waits for a tap.

	A device with a mouse gets the bar instead (see NavBar). The face is
	chosen by the device and not by the orientation: a phone turned sideways
	is still a phone, and the bar does not fit in a phone held sideways.
-->
<div class="pointer-events-none fixed inset-0 z-95 hidden pointer-coarse:block">
	<!-- the scrim: it comes up with the wheel, and it takes a tap to close it -->
	<button
		type="button"
		aria-label={t('common_nav_close')}
		class="absolute inset-0 cursor-default bg-bg/70 backdrop-blur-[2px] transition-opacity duration-300 {open
			? 'opacity-100'
			: 'opacity-0'} {sticky ? 'pointer-events-auto' : ''}"
		onclick={close}
	></button>

	<!-- the wheel: a fan in the upper left, the corner is off screen -->
	{#each rootItems as item, i (item.id)}
		{@const on = highlighted === item.id}
		<div
			class="face absolute flex flex-col items-center {open
				? 'opacity-100'
				: 'opacity-0'} {layer === 'sub' && item.id !== 'lang' ? 'face-dim' : ''}"
			style="left: {item.x}px; top: {item.y}px; {faceTransform(
				item.x,
				item.y,
				open
			)}; transition-delay: {faceDelay(i, open, rootItems.length)};"
		>
			<!-- a face is the bar's button, on the bar's own surface -->
			<button
				type="button"
				title={item.action?.label}
				aria-label={item.action?.label}
				class="flex size-11 items-center justify-center rounded-full border bg-fg text-text/70 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-colors duration-150 {on
					? 'border-text/45 text-text'
					: 'border-border'} {sticky ? 'pointer-events-auto' : ''}"
				onclick={() => pickFace(item.id)}
			>
				<span class="{item.action?.icon} size-5"></span>
			</button>
			{#if on && layer === 'root'}
				<span
					class="absolute top-full mt-1.5 rounded-sm border border-border/60 bg-fg px-1.5 py-0.5 text-[10px] font-light tracking-wider whitespace-nowrap text-text/70"
					style={labelStyle(item.x)}
				>
					{item.action?.label}
				</span>
			{/if}
		</div>
	{/each}

	<!--
		The second ring: it stands on the language button, so the three
		languages are read as a ring around the button that opened them.
	-->
	{#each subItems as item, i (item.id)}
		{@const on = subHighlighted === item.id}
		<button
			type="button"
			aria-label={item.label}
			class="face absolute flex flex-col items-center {layer === 'sub'
				? 'opacity-100'
				: 'opacity-0'} {sticky ? 'pointer-events-auto' : ''}"
			style="left: {item.x}px; top: {item.y}px; {subTransform(
				item.x,
				item.y,
				layer === 'sub'
			)}; transition-delay: {faceDelay(i, layer === 'sub', subItems.length)};"
			onclick={() => pickLocale(item.id)}
		>
			<span
				class="flex size-9 items-center justify-center rounded-full border bg-fg text-xs font-light tracking-wider text-text/70 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-colors duration-150 {on
					? 'border-text/45 text-text'
					: 'border-border'}"
			>
				{item.label}
			</span>
		</button>
	{/each}
</div>

<button
	bind:this={fab}
	type="button"
	aria-label={t('common_nav_menu')}
	title={t('common_nav_menu')}
	class="pointer-events-auto fixed z-100 hidden touch-none items-center justify-center rounded-full border border-border bg-fg text-text/70 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-colors duration-150 select-none active:bg-accent/10 pointer-coarse:flex {sheetopen
		? 'pointer-events-none opacity-0'
		: ''}"
	style="width: {FAB}px; height: {FAB}px; right: calc({INSET}px + env(safe-area-inset-right, 0px)); bottom: calc({INSET}px + env(safe-area-inset-bottom, 0px));"
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerCancel}
>
	<span class="icon-[heroicons--squares-2x2] size-5"></span>
</button>

<style>
	/* the faces move on their own — they never scale the page */
	.face {
		transition:
			transform 340ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 240ms ease;
	}

	/* the first ring steps back when the second ring comes forward */
	.face-dim {
		opacity: 0.25;
	}

	@media (prefers-reduced-motion: reduce) {
		.face {
			transition: none;
		}
	}
</style>
