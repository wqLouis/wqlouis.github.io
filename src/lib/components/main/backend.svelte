<script lang="ts">
	import sqlite from '$lib/assets/backend/SQLite.svg';

	const icons = [sqlite];
</script>

{#each icons as icon, i (i)}
	<img src={icon} alt="" class="h-16" />
{/each}
