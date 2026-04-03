<script lang="ts">
	import { onMount } from 'svelte';

	export let time: string = '70s';

	let element: HTMLElement;
	let overlay: HTMLElement;

	onMount(() => {
		const handleMouseEnter = () => {
			element.style.animationPlayState = 'paused';
		};
		const handleMouseLeave = () => {
			element.style.animationPlayState = 'running';
		};

		overlay.addEventListener('mouseenter', handleMouseEnter);
		overlay.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			overlay.removeEventListener('mouseenter', handleMouseEnter);
			overlay.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<div class="relative mx-auto w-full overflow-hidden">
	<div
		class="absolute z-1 size-full bg-linear-to-r from-bg via-transparent to-bg"
		bind:this={overlay}
	></div>
	<div
		class="inline-flex animate-[marquee_var(--animation-time)_linear_infinite] flex-nowrap duration-1000 *:mx-8"
		bind:this={element}
		style="--animation-time: {time}"
	>
		<div class="flex w-max shrink-0 flex-row items-center gap-6">
			<slot />
		</div>
		<div class="flex w-max shrink-0 flex-row items-center gap-6">
			<slot />
		</div>
	</div>
</div>
