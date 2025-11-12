<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import githubIcon from '$lib/assets/github-mark-white.svg';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav
	class="[&>div]:py-auto absolute flex h-1/15 w-full border-b border-slate-700 bg-slate-950 [&>div]:border-slate-700"
>
	<div class="w-16 border-r sm:max-w-32 sm:min-w-32">
		<div class="mx-auto my-auto flex size-8 h-full flex-none items-center">
			<a class="" href="/"
				><div
					class="size-8 overflow-hidden rounded-full bg-[url(https://avatars.githubusercontent.com/u/114333810?v=4&size=64)] bg-cover transition-all hover:scale-125"
				></div></a
			>
		</div>
	</div>
	<div class="grid flex-1 place-content-center border-r">
		<a href="/learning" class="transition-all text-shadow-slate-50 hover:[text-shadow:0_0_12px]"
			>Learning</a
		>
	</div>
	<div class="grid flex-1 place-content-center">
		<a href="/blog" class="transition-all text-shadow-slate-50 hover:[text-shadow:0_0_12px]">Blog</a
		>
	</div>
</nav>
<side-bar
	class="absolute -z-1 flex min-h-full w-16 flex-col border-r border-slate-700 bg-slate-950 sm:w-32"
>
	<div class="flex-128"></div>
	<div class="grid h-auto w-full flex-1 place-content-center">
		<a href="https://github.com/wqLouis" title="github">
			<img src={githubIcon} alt="" class="mx-auto my-0 scale-50 sm:scale-33" /></a
		>
	</div>
</side-bar>

{@render children()}
