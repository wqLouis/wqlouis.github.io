<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { BtnAnimation } from '$lib/src/btnAnimation';
	import Blog from './blog.svelte';

	BtnAnimation();
</script>

<section class="min-h-screen w-screen bg-bg" id="blog-list">
	<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-12">
			<div class="flex items-center gap-4">
				<button
					title="Return to home"
					class="animate-btn group flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-fg transition-all hover:scale-105 hover:bg-fg/80"
					onclick={() => {
						goto(resolve('/'));
					}}
				>
					<span
						class="icon-[heroicons--arrow-left-20-solid] size-5 text-text/70 transition-transform group-hover:-translate-x-0.5"
					></span>
				</button>
				<div>
					<h1 class="text-4xl font-bold tracking-tight text-text">Blog Posts</h1>
					<p class="mt-2 text-lg text-text/70">
						Thoughts, tutorials, and insights on technology and development
					</p>
				</div>
			</div>

			<div class="mt-8 border-b border-border/50 pb-4">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<p class="text-text/60">
						{#if page.data.blogs.length === 0}
							No blog posts yet
						{:else if page.data.blogs.length === 1}
							1 article
						{:else}
							{page.data.blogs.length} articles
						{/if}
					</p>

					<!-- Future: Search/filter component -->
					<div class="flex gap-3">
						<!-- Placeholder for future filter buttons -->
					</div>
				</div>
			</div>
		</div>

		<!-- Blog list -->
		<div class="space-y-6">
			{#if page.data.blogs.length === 0}
				<div class="rounded-xl border-2 border-dashed border-border bg-fg/50 p-12 text-center">
					<span class="mx-auto icon-[heroicons--document-text-20-solid] size-12 text-text/30"
					></span>
					<h3 class="mt-4 text-lg font-medium text-text/60">No blog posts yet</h3>
					<p class="mt-2 text-text/50">Check back soon for new articles.</p>
				</div>
			{:else}
				{#each page.data.blogs as blog (blog.slug)}
					<Blog
						title={blog.title}
						description={blog.description}
						route={`/blogs/${blog.slug}`}
						tags={blog.tags}
						date={blog.date}
					/>
				{/each}
			{/if}
		</div>

		<!-- Footer note -->
		<div class="mt-16 border-t border-border/30 pt-8 text-center">
			<p class="text-sm text-text/50">
				Built with
				<span class="icon-[simple-icons--svelte] inline-block size-4 align-text-bottom text-text/60"
				></span> SvelteKit
			</p>
		</div>
	</div>
</section>
