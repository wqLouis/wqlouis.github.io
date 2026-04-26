<script lang="ts">
	import { onMount } from 'svelte';

	export let popOffset = { x: 0, y: 0 };

	let onHoverObject: HTMLElement;
	let tooltip: HTMLElement;

	let xShift = 0;
	let yShift = 0;

	const mouseEnterHandler = () => {
		tooltip.style.left = `calc(${xShift}px + ${popOffset.x}%)`;
		tooltip.style.bottom = `calc(${yShift}px + ${popOffset.y}%)`;
		tooltip.classList.toggle('opacity-100', true);
		tooltip.classList.toggle('blur-xs', false);
		tooltip.classList.toggle('scale-100', true);
		tooltip.classList.toggle('scale-10', false);
	};
	const mouseLeaveHandler = () => {
		tooltip.style.left = `${xShift}px`;
		tooltip.style.bottom = `${yShift}px`;
		tooltip.classList.toggle('opacity-100', false);
		tooltip.classList.toggle('blur-xs', true);
		tooltip.classList.toggle('scale-100', false);
		tooltip.classList.toggle('scale-10', true);
	};

	onMount(() => {
		onHoverObject = tooltip.parentElement as HTMLElement;

		let objRect = onHoverObject.getBoundingClientRect();
		let tipRect = tooltip.getBoundingClientRect();

		xShift = objRect.width / 2 - tipRect.width / 2;
		yShift = objRect.height / 2 - tipRect.height / 2;
		tooltip.style.left = `${xShift}px`;
		tooltip.style.bottom = `${yShift}px`;

		onHoverObject.addEventListener('mouseenter', mouseEnterHandler);
		onHoverObject.addEventListener('mouseleave', mouseLeaveHandler);

		return () => {
			onHoverObject.removeEventListener('mouseenter', mouseEnterHandler);
			onHoverObject.removeEventListener('mouseleave', mouseLeaveHandler);
		};
	});
</script>

<div
	class="pointer-events-none absolute z-10 h-8 min-h-max w-max min-w-max text-xs text-text opacity-0 transition-all"
	bind:this={tooltip}
>
	<div class="size-full rounded-xl"><slot /></div>
</div>
