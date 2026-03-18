<script lang="ts">
	import { onMount } from 'svelte';

	let cursor: HTMLElement;
	let cursorMirror: HTMLElement;

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
</script>

<section class="flex h-screen w-screen flex-col bg-bg/90">
	<div
		class="fixed top-0 left-0 size-[35vw] animate-pulse rounded-full bg-amber-600/60 blur-[100vw] backdrop-blur-2xl"
		bind:this={cursor}
	></div>
	<div
		class="fixed top-0 left-0 size-[35vw] animate-pulse rounded-full bg-teal-600/60 blur-[100vw] backdrop-blur-2xl"
		bind:this={cursorMirror}
	></div>
	<section class="z-1 flex size-full flex-col bg-bg/70 backdrop-blur-2xl">
		<div class="sticky flex h-18 w-full border-b-2 border-border bg-bg">
			<span class="mx-8 my-auto text-xl font-bold text-text/80">Linux Wallpaper Engine</span>
		</div>
		<div class="flex h-full w-full">
			<div
				class="mx-auto mt-[33vh] flex cursor-default flex-col text-text text-shadow-[0_0_12px] text-shadow-text"
			>
				<div class="flex h-min flex-col gap-4">
					<span class="z-10 my-auto text-6xl font-bold">Linux Wallpaper Engine</span>
					<span class="text-xs font-medium"
						>Another Wallpaper Engine written with Rust and Wgpu
					</span>
				</div>
				<div class="m-4 flex h-max w-full justify-center gap-8">
					<button
						title="install"
						class="w-48 cursor-pointer rounded-full border-2 border-amber-800/50 bg-amber-600/30 px-6 py-2 text-lg font-bold text-text/90 shadow-amber-600/40 transition-all ease-out text-shadow-[0_0_4px] text-shadow-text/50 hover:scale-120 hover:bg-amber-600/40 hover:shadow-[0_0_12px] hover:text-shadow-[0_0_12px]
						"
					>
						Installation
					</button>
					<button
						title="install"
						class="w-48 cursor-pointer rounded-full border-2 border-gray-700/90 bg-gray-900/50 px-6 py-2 text-lg font-bold text-text/90 transition-all ease-out text-shadow-[0_0_4px] text-shadow-text/50 hover:scale-120"
					>
						Github
					</button>
				</div>
			</div>
		</div>
	</section>
</section>
