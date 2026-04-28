<script lang="ts">
	export let icons: Array<{ src: string; alt?: string; className?: string }> = [];
	export let className = '';
	export let iconClass = '';
</script>

<div class="flex shrink-0 flex-row items-center gap-4">
	{#each icons as icon (icon.src)}
		<img
			src={icon.src}
			alt={icon.alt || ''}
			class="size-9 shrink-0 object-contain {className} {icon.className || ''} {iconClass}"
		/>
	{/each}
</div>
