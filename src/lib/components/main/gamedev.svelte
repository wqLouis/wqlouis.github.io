<script lang="ts">
	import unity from '$lib/assets/gamedev/Unity_Technologies_logo.svg';
	import godot from '$lib/assets/gamedev/Godot Game engine logo.svg';

	const icons = [unity, godot];
</script>

{#each icons as icon, i (i)}
	<img src={icon} alt="" class="h-auto max-h-16 object-cover" />
{/each}
