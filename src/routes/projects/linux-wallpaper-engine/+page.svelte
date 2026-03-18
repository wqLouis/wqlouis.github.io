<script lang="ts">
	import { BtnAnimation } from '$lib/src/btnAnimation';
	import { onMount } from 'svelte';

	let cursor: HTMLElement;
	let cursorMirror: HTMLElement;

	// Cursor background effects
	onMount(() => {
		const htmlElement = Array.from(document.getElementsByTagName('html'))[0] as HTMLElement;
		const layout = Array.from(document.getElementsByClassName('layout'))[0] as HTMLElement; // assume only one layout class
		const cursorRect = cursor.getBoundingClientRect();
		const cursorHandler = (event: MouseEvent) => {
			cursor.style.transform = `translate(${event.clientX - cursorRect.width / 2}px, ${event.clientY - cursorRect.height / 2}px)`;
			cursorMirror.style.transform = `translate(${window.innerWidth - event.clientX - cursorRect.width / 2}px, ${window.innerHeight - event.clientY - cursorRect.height / 2}px)`;
		};

		document.addEventListener('mousemove', cursorHandler);

		htmlElement.classList.toggle('dark', true);
		layout.classList.toggle('shadow-[0_0_24px]', false);
		return () => {
			document.removeEventListener('mousemove', cursorHandler);
			htmlElement.classList.toggle('dark', false);
			layout.classList.toggle('shadow-[0_0_24px]', true);
		};
	});

	let installState = 'arch';

	// Installation
	onMount(() => {});

	BtnAnimation();
</script>

<section class="flex h-max w-screen flex-col bg-bg/90">
	<div
		class="fixed top-0 left-0 size-[35vw] animate-pulse rounded-full bg-amber-600/60 blur-[100vw] backdrop-blur-2xl"
		bind:this={cursor}
	></div>
	<div
		class="fixed top-0 left-0 size-[35vw] animate-pulse rounded-full bg-teal-600/60 blur-[100vw] backdrop-blur-2xl"
		bind:this={cursorMirror}
	></div>
	<div
		class="fixed top-0 z-100 flex h-18 w-full border-b-2 border-border bg-bg shadow-[0_4px_12px] shadow-bg/70"
	>
		<span class="mx-8 my-auto text-xl font-bold text-text/80">Linux Wallpaper Engine</span>
	</div>
	<section class="z-1 flex h-screen w-full flex-col bg-bg/70 backdrop-blur-2xl">
		<div class="flex h-full w-full">
			<div
				class="mx-auto mt-[33vh] flex cursor-default flex-col text-text text-shadow-[0_0_12px] text-shadow-text"
			>
				<div class="flex h-min flex-col gap-4">
					<span class="z-10 my-auto text-6xl font-bold">Linux Wallpaper Engine</span>
					<span class="text-xs font-medium"
						>Another Linux Wallpaper Engine written with Rust and Wgpu
					</span>
				</div>
				<div class="m-4 mt-12 flex h-max w-full justify-center gap-8">
					<button
						title="install"
						class="animate-btn mx-4 flex w-48 cursor-pointer gap-2 rounded-full border-2 border-amber-800/50 bg-amber-600/30 px-6 py-2 text-lg font-bold text-text/90 shadow-amber-600/40 transition-all ease-out text-shadow-[0_0_4px] text-shadow-text/50 hover:scale-120 hover:bg-amber-600/40 hover:shadow-[0_0_12px]
						"
						onclick={() => {
							const section = document.getElementById('installation') as HTMLElement;
							section.scrollIntoView({ behavior: 'smooth' });
						}}
					>
						<span class="my-auto ml-auto">Installation</span>
						<span class="my-auto icon-[heroicons--arrow-right-20-solid] size-6"></span>
					</button>
					<a
						title="github"
						class="mx-4 flex w-48 cursor-pointer gap-2 rounded-full border-2 border-gray-700/90 bg-gray-900/50 px-6 py-2 text-center text-lg font-bold text-text/90 shadow-gray-700/50 transition-all ease-out text-shadow-[0_0_4px] text-shadow-text/50 hover:scale-120 hover:bg-gray-700/50 hover:shadow-[0_0_12px] hover:text-shadow-[0_0_12px]"
						href="https://github.com/wqLouis/linux-wallpaperengine"
						target="_blank"
					>
						<span class="my-auto ml-auto">Github</span>
						<span class="my-auto mr-auto icon-[octicon--mark-github-24] size-6"></span>
					</a>
				</div>
			</div>
		</div>
	</section>
	<section
		class="z-1 flex h-screen w-full flex-col bg-bg/70 pt-28 backdrop-blur-2xl"
		id="installation"
	>
		<div class="mx-auto mb-12 flex h-max w-6/10 rounded-2xl border-2 border-border bg-fg p-4 px-6">
			<span class="text-center text-3xl font-bold text-text/80">Installation</span>
			<div class="mx-8 flex gap-4">
				<button
					title="arch install"
					class="cursor-pointer rounded-xl border-2 border-border/70 bg-fg/70 px-2 text-xs font-medium text-text transition-all hover:bg-gray-700/20"
					onclick={() => {
						installState = 'arch';
					}}><span>For Arch Linux</span></button
				>
				<button
					title="build from source"
					class="cursor-pointer rounded-xl border-2 border-border/70 bg-fg/70 px-2 text-xs font-medium text-text transition-all hover:bg-gray-700/20"
					onclick={(event: MouseEvent) => {
						installState = 'source';
					}}><span>Build from source</span></button
				>
			</div>
		</div>
		{#if installState === 'arch'}
			<div
				class="mx-auto flex h-max w-6/10 flex-col rounded-2xl border-2 border-border/70 bg-fg/70 p-4 backdrop-blur-2xl transition-all"
			>
				<span class="text-xl font-bold text-text/80">Install From AUR</span>
			</div>
		{/if}
		{#if installState === 'source'}{/if}
		{#if installState === ''}{/if}
	</section>
</section>
