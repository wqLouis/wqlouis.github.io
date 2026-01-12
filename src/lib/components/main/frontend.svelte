<script lang="ts">
	import svelte from '$lib/assets/frontend/favicon.svg';
	import tailwind from '$lib/assets/frontend/tailwindcss-mark.d52e9897.svg';
	import flet from '$lib/assets/frontend/logo.svg';
	import qt from '$lib/assets/frontend/Qt_logo_2016.svg';

	const icons = [svelte, tailwind, flet, qt];
</script>

{#each icons as icon, i (i)}
	<img src={icon} alt="" class="size-16" />
{/each}
