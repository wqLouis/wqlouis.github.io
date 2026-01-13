<script lang="ts">
	import { onMount } from 'svelte';

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
		class="inline-flex animate-[marquee_75s_linear_infinite] flex-nowrap *:mx-8"
		bind:this={element}
	>
		<div class="flex w-max shrink-0 flex-row items-center gap-6">
			<slot />
		</div>
		<div class="flex w-max shrink-0 flex-row items-center gap-6">
			<slot />
		</div>
	</div>
</div>
