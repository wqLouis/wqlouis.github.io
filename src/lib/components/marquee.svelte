<script lang="ts">
	import { onMount } from 'svelte';

	export let time: string = '70s';

	let element: HTMLElement;
	let overlay: HTMLElement;

	onMount(() => {
		overlay.addEventListener('mouseenter', () => {
			element.style.animationPlayState = 'paused';
		});
		overlay.addEventListener('mouseleave', () => {
			element.style.animationPlayState = 'running';
		});
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
