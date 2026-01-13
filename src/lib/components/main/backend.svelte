<script lang="ts">
	import sqlite from '$lib/assets/backend/SQLite.svg';

	export let className: string = '';

	const icons = [sqlite];
</script>

{#each icons as icon, i (i)}
	<img src={icon} alt="" class="h-auto max-h-16 object-cover {className}" />
{/each}
