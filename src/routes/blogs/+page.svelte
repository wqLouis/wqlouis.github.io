<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { BtnAnimation } from '$lib/src/btnAnimation';
	import Blog from './blog.svelte';

	BtnAnimation();
</script>

<section class="h-max min-h-screen w-screen bg-bg" id="blog-list">
	<div class="mx-auto flex h-max min-h-full w-max flex-col">
		<div class="flex">
			<div class="mr-0 size-16 bg-border/20">
				<div class="size-full rounded-tr-2xl bg-bg"></div>
			</div>
			<div class="mb-8 flex w-full cursor-default rounded-b-2xl bg-border/20 px-4 pt-6 pb-6">
				<button
					title="Return"
					class="animate-btn hover:[&>.]: mx-4 my-auto flex size-8 cursor-pointer rounded-full border-2 border-border/50 bg-fg transition-all hover:scale-125"
					onclick={() => {
						goto(resolve('/'));
					}}
				>
					<span class="my-auto icon-[heroicons--chevron-up-16-solid] size-full rotate-270"></span>
				</button>
				<span class="my-auto text-2xl font-bold">My Blogs</span>
			</div>
			<div class="ml-0 size-16 bg-border/20">
				<div class="size-full rounded-tl-2xl bg-bg"></div>
			</div>
		</div>

		<div class="flex flex-col gap-8 py-8">
			<Blog
				title="Linux 從入門到 Windows"
				discription="大概告訴你如何選擇 Linux distro 和一些基本的Linux東西"
				route="/我還沒寫"
				tags={['Linux', 'OS', 'Operating Systems']}
			></Blog>
			<Blog
				title="如何用Wgpu + Rust寫一個簡單渲染器"
				discription="Wgpu是一個非常好用的Rust渲染框架，兼容不同的GPU後端"
				route="/我還沒寫"
				tags={['Rust', 'WGPU', 'Programming']}
			></Blog>
			<Blog
				title="使用Github pages + Svelte構建一個個人網站"
				discription="Svelte是一個新銳的前端框架，非常好用，使我的鍵盤旋轉"
				route="/我還沒寫"
				tags={['TypeScript', 'Svelte', 'Web dev', 'SvelteKit']}
			></Blog>
			<Blog
				title="Linux wallpaper engine 開發日誌"
				discription="太無聊寫的一個Linux wallpaper engine,採用Wgpu + Vulkan渲染，以及Rust"
				route="/我還沒寫"
				tags={['Linux', 'WGPU', 'Rust', 'Programming']}
			></Blog>
		</div>
	</div>
</section>
