<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Tooltip from '$lib/components/tooltip.svelte';
	import type { RouteId } from '$app/types';
	import { BtnAnimation } from '$lib/src/btnAnimation';

	import '../app.css';
	let { children } = $props();

	BtnAnimation();
</script>

{@render children()}

<div class="pointer-events-none fixed bottom-5 flex w-screen">
	<div
		class="pointer-events-auto m-auto flex min-w-max cursor-default gap-4 rounded-full border-2 border-border/50 bg-fg/80 p-2 text-xl text-text/70 shadow-[0_0_4px] shadow-border/30 backdrop-blur-xs"
	>
		<button
			title="Home"
			class="animate-btn my-auto flex size-8 cursor-pointer rounded-full transition-all hover:bg-text/10 hover:[&>span]:scale-110"
			onclick={() => {
				if (page.url.pathname != '/') {
					goto(resolve('/'));
				} else {
					let home = document.getElementById('home');
					if (home != null) {
						home.scrollIntoView({
							behavior: 'smooth'
						});
					}
				}
			}}
		>
			<span class="m-auto icon-[heroicons--home-20-solid] transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 130 }}>
				<div class="flex size-full"><span class="mx-4 my-auto">Home</span></div>
			</Tooltip>
		</button>
		<a
			title="Blogs"
			href={resolve('/blogs' as RouteId)}
			class="animate-btn my-auto flex size-8 cursor-pointer rounded-full transition-all hover:bg-text/10 hover:[&>span]:scale-110"
		>
			<span class="m-auto icon-[heroicons--book-open-20-solid] transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 130 }}>
				<div class="flex size-full"><span class="mx-4 my-auto">Blogs</span></div>
			</Tooltip>
		</a>
		<a
			class="animate-btn my-auto flex size-8 cursor-pointer rounded-full transition-all hover:bg-text/10 hover:[&>span]:scale-110"
			title="github"
			href="https://github.com/wqLouis"
			target="_blank"
		>
			<span class="m-auto icon-[octicon--mark-github-24] size-5"></span>
			<Tooltip popOffset={{ x: 0, y: 130 }}>
				<div class="flex size-full"><span class="mx-4 my-auto">Github</span></div>
			</Tooltip>
		</a>
		<a
			class="animate-btn my-auto flex size-8 cursor-pointer rounded-full transition-all hover:bg-text/10 hover:[&>span]:scale-110"
			title="mail"
			href="mailto:wql-louis@outlook.com"
		>
			<span class="m-auto icon-[material-symbols--mail-rounded] size-5 transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 130 }}>
				<div class="flex size-full"><span class="mx-4 my-auto">Email</span></div>
			</Tooltip>
		</a>
		<button
			title="Dark Mode"
			class="animate-btn my-auto flex size-8 cursor-pointer rounded-full transition-all hover:bg-text/10 hover:[&>span]:scale-110"
			onclick={() => {}}
		>
			<span class="m-auto icon-[heroicons--moon-16-solid] transition-all"></span>
			<Tooltip popOffset={{ x: 0, y: 130 }}>
				<div class="flex size-full"><span class="mx-4 my-auto">Dark Mode</span></div>
			</Tooltip>
		</button>
	</div>
</div>
