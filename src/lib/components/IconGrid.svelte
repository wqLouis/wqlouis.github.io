<script lang="ts">
	export let icons: Array<{ src: string; alt?: string; className?: string }> = [];
	export let className = '';
	export let iconClass = '';
</script>

{#each icons as icon (icon.src)}
	<img
		src={icon.src}
		alt={icon.alt || ''}
		class="h-auto max-h-16 object-cover {className} {icon.className || ''} {iconClass}"
	/>
{/each}
