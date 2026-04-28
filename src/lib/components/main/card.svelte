<script lang="ts">
	export let link: string = 'https://wqlouis.github.io/';
	export let image: string = '';
	export let cardTitle: string = '';
	export let tags: string[] = [];
</script>

<a
	href={link}
	target="_blank"
	class="group flex w-72 flex-col overflow-hidden rounded-lg border border-border bg-fg transition-all hover:border-text"
>
	<div class="flex h-44 items-center justify-center overflow-hidden bg-fg">
		{#if image}
			<img src={image} class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105" alt="" />
		{:else}
			<span class="icon-[heroicons--photo-20-solid] size-10 text-text/20"></span>
		{/if}
	</div>
	<div class="flex flex-1 flex-col gap-3 px-5 py-4">
		<h3 class="text-base font-light tracking-wider text-text">{cardTitle}</h3>
		{#if tags.length > 0}
			<div class="flex flex-wrap gap-1.5">
				{#each tags as tag (tag)}
					<span class="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-light tracking-widest text-text/40">{tag}</span>
				{/each}
			</div>
		{/if}
		<div class="mt-auto flex items-center gap-1 text-[11px] font-light tracking-wider text-text/40 transition-all group-hover:text-text">
			View source code
			<span class="icon-[heroicons--arrow-right-20-solid] size-3 transition-transform group-hover:translate-x-0.5"></span>
		</div>
	</div>
</a>
