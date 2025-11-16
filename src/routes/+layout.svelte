<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import githubIcon from '$lib/assets/github-mark-white.svg';
	import Hldiv from '$lib/Hldiv.svelte';
	import { snap_card } from '$lib/snap_card';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	let cursor: HTMLElement;
	let cursorX = -100,
		cursorY = -100,
		curX = 0,
		curY = 0;
	let raf: number;
	const LAG = 0.14;

	onMount(() => {
		let rect = cursor.getBoundingClientRect();

		var mouseHandler = (e: MouseEvent) => {
			cursorX = Math.round(e.x);
			cursorY = Math.round(e.y);
		};

		const tick = () => {
			curX += (cursorX - curX - rect.width / 2) * LAG;
			curY += (cursorY - curY - rect.height / 2) * LAG;

			cursor.style.top = `${Math.round(curY)}px`;
			cursor.style.left = `${Math.round(curX)}px`;

			raf = requestAnimationFrame(tick);
		};

		document.addEventListener('mousemove', mouseHandler);
		raf = requestAnimationFrame(tick);

		return () => {
			document.removeEventListener('mousemove', mouseHandler);
			cancelAnimationFrame(raf);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="pointer-events-none fixed z-999 size-2 rounded-full border border-gray-200 bg-white shadow-[0_0_32px_16px_rgba(255,255,255,0.5)] transition-transform"
	bind:this={cursor}
></div>

<div class="fixed bottom-1 z-10 grid h-32 w-screen place-content-center">
	<div use:snap_card class="h-16 w-64">
		<Hldiv className="rounded-full">
			<div class="flex h-full justify-around px-4 [*>&]:flex-auto">
				<div class="w-2"></div>
				<a
					href="/"
					title="home"
					class="cursor-hide my-auto rounded-full p-1 transition-all hover:bg-gray-600"
					><div
						class="size-8 rounded-full bg-[url(https://avatars.githubusercontent.com/u/114333810?v=4&size=64)] bg-center"
					></div></a
				>
				<div class="my-auto h-[60%] w-px bg-gray-300"></div>
				<a
					href="https://github.com/wqLouis"
					title="profile"
					class="mx-0 my-auto rounded-full p-1 transition-all hover:bg-gray-600"
					><img src={githubIcon} alt="github" class="size-8" />
				</a>
				<div class="my-auto h-[60%] w-px bg-gray-300"></div>
				<div class="my-auto">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-8 fill-gray-50"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</div>
				<div class="w-2"></div>
			</div>
		</Hldiv>
	</div>
</div>

{@render children()}
