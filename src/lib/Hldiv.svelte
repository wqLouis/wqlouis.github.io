<script lang="ts">
	import { onMount } from 'svelte';
	export let className: string = '';
	let hldiv: HTMLDivElement;

	let targetX = 0.5,
		targetY = 0.5;
	let targetShadowX = 0,
		targetShadowY = 0;
	let currentX = 0.5,
		currentY = 0.5;
	let currentShadowX = 0,
		currentShadowY = 0;

	const LAG = 0.4;
	let raf: number;

	const clamp = (a: number, min: number, max: number) => {
		if (a >= min) {
			if (a <= max) {
				return a;
			} else {
				return max;
			}
		} else {
			return min;
		}
	};

	const tick = () => {
		currentX += (targetX - currentX) * LAG;
		currentY += (targetY - currentY) * LAG;
		currentShadowX += (targetShadowX - currentShadowX) * LAG;
		currentShadowY += (targetShadowY - currentShadowY) * LAG;

		hldiv.style.setProperty('--gradient-x', `${(currentX * 100).toFixed(2)}%`);
		hldiv.style.setProperty('--gradient-y', `${(currentY * 100).toFixed(2)}%`);
		hldiv.style.setProperty('--shadow-x', `${Math.round(currentShadowX)}px`);
		hldiv.style.setProperty('--shadow-y', `${Math.round(currentShadowY)}px`);

		raf = requestAnimationFrame(tick);
	};

	const updateTarget = (e: MouseEvent) => {
		const rect = hldiv.getBoundingClientRect();
		targetX = (e.clientX - rect.left) / rect.width;
		targetY = (e.clientY - rect.top) / rect.height;

		const dX = (e.clientX - (rect.left + rect.right) / 2) / rect.width;
		const dY = (e.clientY - (rect.top + rect.bottom) / 2) / rect.height;

		if (Math.abs(dX) > 2 || Math.abs(dY) > 2) {
			hldiv.style.setProperty('--from-color', 'gray-700');
		} else {
			hldiv.style.setProperty('--from-color', 'white');
		}

		targetShadowX = Math.round(clamp(dX, -1, 1) * -6);
		targetShadowY = Math.round(clamp(dY, -1, 1) * -10);
	};

	onMount(() => {
		document.addEventListener('mousemove', updateTarget);
		raf = requestAnimationFrame(tick);
		return () => {
			document.removeEventListener('mousemove', updateTarget);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div
	bind:this={hldiv}
	class="relative h-full w-full overflow-hidden rounded-4xl bg-radial-[circle_at_var(--gradient-x)_var(--gradient-y)] from-(--from-color) from-0% to-gray-700 to-30% p-px shadow-[var(--shadow-x)_var(--shadow-y)_16px_rgba(0,0,0,0.8)] backdrop-blur-xs transition-colors {className}"
	style="--gradient-x: 50%; --gradient-y: 50%; --shadow-x: 0px; --shadow-y: 0px; --from-color: white;"
>
	<div class="h-full w-full rounded-4xl bg-gray-900 opacity-98 {className}">
		<slot />
	</div>
</div>
