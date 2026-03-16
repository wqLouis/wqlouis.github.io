<script lang="ts">
	import { onMount } from 'svelte';

	export let onHoverObject: HTMLElement;

	let tooltip: HTMLElement;
	let mouseEnterHandler = () => {};
	let mouseLeaveHandler = () => {};

	onMount(() => {
		onHoverObject.addEventListener('mouseenter', mouseEnterHandler);
		onHoverObject.addEventListener('mouseleave', mouseLeaveHandler);

		return () => {
			onHoverObject.removeEventListener('mouseenter', mouseEnterHandler);
			onHoverObject.removeEventListener('mouseleave', mouseLeaveHandler);
		};
	});
</script>

<div class="absolute min-h-max min-w-max" bind:this={tooltip}>
	<slot />
</div>
