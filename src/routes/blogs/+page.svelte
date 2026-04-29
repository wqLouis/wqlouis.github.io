<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Blog from './blog.svelte';
	import * as m from '$paraglide/messages.js';
</script>

<section class="min-h-screen w-screen bg-bg" id="blog-list">
	<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="mb-12">
			<div class="flex items-center gap-4">
				<button
					title={m.blogs_back_to_home()}
					class="flex size-10 cursor-pointer items-center justify-center rounded-md border border-border transition-all hover:border-text active:border-2 active:border-text"
					onclick={() => {
						goto(resolve('/'));
					}}
				>
					<span class="icon-[heroicons--arrow-left-20-solid] size-5 text-text/70"></span>
				</button>
				<div>
					<h1 class="text-2xl font-light tracking-wider text-text">{m.blogs_page_title()}</h1>
					<p class="mt-2 text-sm font-light tracking-wide text-text/60">
						{m.blogs_page_subtitle()}
					</p>
				</div>
			</div>

			<div class="mt-8 border-b border-border/50 pb-4">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<p class="text-xs font-light tracking-wide text-text/50">
						{#if page.data.blogs.length === 0}
							{m.blogs_no_articles()}
						{:else if page.data.blogs.length === 1}
							{m.blogs_one_article()}
						{:else}
							{m.blogs_articles_count(page.data.blogs.length)}
						{/if}
					</p>
					<div class="flex gap-3"></div>
				</div>
			</div>
		</div>

		<div class="space-y-6">
			{#if page.data.blogs.length === 0}
				<div class="rounded-lg border border-border bg-fg/50 p-12 text-center">
					<h3 class="text-sm font-light tracking-wide text-text/50">{m.blogs_no_articles()}</h3>
					<p class="mt-2 text-xs font-light tracking-wide text-text/40">
						{m.blogs_no_articles_hint()}
					</p>
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

		<div class="mt-16 border-t border-border/30 pt-8 text-center">
			<p class="text-xs font-light tracking-wide text-text/50">{m.blogs_footer_built_with()}</p>
		</div>
	</div>
</section>
