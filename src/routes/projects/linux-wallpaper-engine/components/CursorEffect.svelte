<script lang="ts">
	import { onMount } from 'svelte';

	export let enabled = true;
	export let size = '35vw';
	export let blur = '100vw';
	export let colors = {
		primary: 'rgba(217, 119, 6, 0.6)', // amber-600/60
		secondary: 'rgba(13, 148, 136, 0.6)' // teal-600/60
	};

	let cursor: HTMLElement;
	let cursorMirror: HTMLElement;

	onMount(() => {
		if (!enabled) return;

		const cursorRect = cursor.getBoundingClientRect();
		const cursorHandler = (event: MouseEvent) => {
			cursor.style.transform = `translate(${event.clientX - cursorRect.width / 2}px, ${event.clientY - cursorRect.height / 2}px)`;
			cursorMirror.style.transform = `translate(${window.innerWidth - event.clientX - cursorRect.width / 2}px, ${window.innerHeight - event.clientY - cursorRect.height / 2}px)`;
		};

		document.addEventListener('mousemove', cursorHandler);

		return () => {
			document.removeEventListener('mousemove', cursorHandler);
		};
	});
</script>

{#if enabled}
	<div
		class="fixed top-0 left-0 animate-pulse rounded-full backdrop-blur-2xl"
		bind:this={cursor}
		aria-hidden="true"
		style="width: {size}; height: {size}; background-color: {colors.primary}; filter: blur({blur})"
	></div>
	<div
		class="fixed top-0 left-0 animate-pulse rounded-full backdrop-blur-2xl"
		bind:this={cursorMirror}
		aria-hidden="true"
		style="width: {size}; height: {size}; background-color: {colors.secondary}; filter: blur({blur})"
	></div>
{/if}
