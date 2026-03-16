<script lang="ts">
	import Blog from './blog.svelte';
</script>

<section class="h-max min-h-screen w-screen bg-bg" id="blog-list">
	<div class="mx-auto flex h-max min-h-full w-max flex-col">
		<span class="my-8 px-12 text-2xl font-bold">My Blogs</span>
		<div class="h-px w-screen rounded-full bg-text/50 transition-all md:mx-auto md:w-[85vw]"></div>

		<div class="flex flex-col gap-8">
			<Blog title="Hello world This is a title" discription="This is the discription"></Blog>
			<Blog></Blog>
			<Blog></Blog>
			<Blog></Blog>
			<Blog></Blog>
			<Blog></Blog>
		</div>
	</div>
</section>
