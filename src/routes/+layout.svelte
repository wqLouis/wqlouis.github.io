<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
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
		</button>
		<a
			title="Blogs"
			href={resolve('/blogs' as RouteId)}
			class="animate-btn my-auto flex size-8 cursor-pointer rounded-full transition-all hover:bg-text/10 hover:[&>span]:scale-110"
		>
			<span class="m-auto icon-[heroicons--book-open-20-solid] transition-all"></span>
		</a>
	</div>
</div>
