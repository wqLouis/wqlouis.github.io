<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { createEventDispatcher } from 'svelte';
	import { onDestroy } from 'svelte';

	const dispatch = createEventDispatcher<{ toggle: 'light' | 'dark' | 'system' }>();

	let currentTheme: 'light' | 'dark' | 'system' = 'system';

	const unsubscribe = theme.subscribe((value) => {
		currentTheme = value;
	});

	onDestroy(() => {
		unsubscribe();
	});

	const toggle = () => {
		const nextTheme =
			currentTheme === 'light' ? 'dark' : currentTheme === 'dark' ? 'system' : 'light';
		theme.set(nextTheme);
		dispatch('toggle', nextTheme);
	};
</script>

<button
	type="button"
	on:click={toggle}
	class="animate-btn my-auto flex size-full cursor-pointer rounded-full transition-all hover:[&>span]:scale-110"
	aria-label={`Current theme: ${currentTheme}. Click to toggle.`}
	title="Toggle theme"
>
	{#if currentTheme === 'light'}
		<span class="m-auto icon-[heroicons--sun-20-solid] size-5 transition-all"></span>
	{:else if currentTheme === 'dark'}
		<span class="m-auto icon-[heroicons--moon-20-solid] size-5 transition-all"></span>
	{:else}
		<span class="m-auto icon-[heroicons--computer-desktop-20-solid] size-5 transition-all"></span>
	{/if}
</button>
