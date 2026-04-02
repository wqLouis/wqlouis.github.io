<script lang="ts">
	import unity from '$lib/assets/gamedev/Unity_Technologies_logo.svg';
	import godot from '$lib/assets/gamedev/Godot Game engine logo.svg';

	export let className: string = '';

	const icons = [
		{ src: unity, isUnity: true },
		{ src: godot, isUnity: false }
	];
</script>

{#each icons as item, i (i)}
	<img
		src={item.src}
		alt=""
		class="h-auto max-h-16 object-cover {className} {item.isUnity ? 'icon-unity' : ''}"
	/>
{/each}
