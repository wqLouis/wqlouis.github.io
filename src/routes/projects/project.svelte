<script lang="ts">
	import * as m from '$paraglide/messages.js';
	let { title = '', description = '', route = '/', tags = [] as string[] } = $props();
</script>

<a
	class="group mx-auto flex w-full max-w-3xl flex-col rounded-lg border border-border bg-fg p-6 transition-all duration-300 hover:border-text md:w-[70vw]"
	href={route}
>
	<div class="flex flex-col gap-3">
		<div class="flex items-start justify-between gap-4">
			<h3 class="text-xl font-light tracking-wider text-text">{title}</h3>
		</div>

		<p class="line-clamp-2 text-sm leading-relaxed font-light tracking-wide text-text/70">
			{description}
		</p>

		{#if tags.length > 0}
			<div class="mt-2 flex flex-wrap gap-2">
				{#each tags as tag (tag)}
					<span
						class="rounded-full border border-border px-3 py-0.5 text-[11px] font-light tracking-wider text-text/50"
					>
						{tag}
					</span>
				{/each}
			</div>
		{/if}

		<div class="mt-4 flex items-center justify-between">
			<span class="inline-flex items-center gap-1 text-xs font-light tracking-wider text-text/50">
				{m.common_project_card_view()}
			</span>
		</div>
	</div>
</a>
