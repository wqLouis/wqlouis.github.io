<script lang="ts">
	import { onMount } from 'svelte';

	let cursor: HTMLElement;

	onMount(() => {
		const htmlElements = Array.from(document.getElementsByTagName('html'));
		const cursorRect = cursor.getBoundingClientRect();
		const cursorHandler = (event: MouseEvent) => {
			cursor.style.transform = `translate(${event.clientX - cursorRect.width / 2}px, ${event.clientY - cursorRect.height / 2}px)`;
		};

		document.addEventListener('mousemove', cursorHandler);

		htmlElements.forEach((element) => {
			element.classList.toggle('dark', true);
		});
		return () => {
			htmlElements.forEach((element) => {
				element.classList.toggle('dark', false);
			});
		};
	});
</script>

<section class="flex h-screen w-screen flex-col bg-bg">
	<div
		class="fixed top-0 left-0 h-[35vw] w-[35vw] animate-pulse rounded-full bg-amber-800 blur-[100vw]"
		bind:this={cursor}
	></div>
	<section class="z-1 flex size-full flex-col bg-bg/88 backdrop-blur-2xl">
		<div class="flex h-full w-full">
			<div
				class="mx-auto mt-[40vh] flex cursor-default text-6xl font-bold text-text text-shadow-[0_0_12px] text-shadow-text"
			>
				<div class="flex h-min gap-4">
					<span class="z-10 my-auto">Linux Wallpaper Engine</span>
				</div>
			</div>
		</div>
	</section>
</section>
