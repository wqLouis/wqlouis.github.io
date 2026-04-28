<script lang="ts">
	const badges = ['Tauri 2.0', 'Cross-platform'];
	const githubUrl = 'https://github.com/wqLouis/NeoTV';
</script>

<section id="main" class="flex min-h-screen items-start justify-center px-8 pt-[35vh]">
	<div class="mx-auto max-w-3xl text-center">
		<div class="mb-3 flex justify-center gap-3">
			{#each badges as badge (badge)}
				<span
					class="rounded-full border border-border/30 px-4 py-1 text-[11px] font-light tracking-wider text-text/50"
				>
					{badge}
				</span>
			{/each}
		</div>

		<h1 class="mb-6 text-4xl font-light tracking-wider md:text-5xl">NeoTV</h1>

		<p class="mb-12 text-sm font-light tracking-wide text-text/60 md:text-base">
			A free, cross-platform online video search and viewing application
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex cursor-pointer items-center gap-2 rounded-sm border border-border px-8 py-3 text-xs font-light tracking-wider text-text/60 transition-all hover:border-text hover:text-text"
			>
				<span>GitHub</span>
				<span class="icon-[octicon--mark-github-24] size-5"></span>
			</a>
		</div>
	</div>
</section>
