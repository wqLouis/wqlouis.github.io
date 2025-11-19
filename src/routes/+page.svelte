<script lang="ts">
	import { smooth_scroll } from '../lib/smooth_scroll.ts';
	import Hldiv from '$lib/Hldiv.svelte';
	import cIcon from '$lib/assets/c.svg';
	import cppIcon from '$lib/assets/cpp.svg';
	import csharpIcon from '$lib/assets/csharp.svg';
	import pythonIcon from '$lib/assets/python.svg';
	import rustIcon from '$lib/assets/rust.svg';
	import jsIcon from '$lib/assets/javascript.svg';
	import tsIcon from '$lib/assets/typescript.svg';

	smooth_scroll();
</script>

<main class="h-auto">
	<section></section>
	<div class="bg-grid pt-[40vh] pb-[45vh] [text-shadow:0_0_24px] text-shadow-slate-100">
		<h1 class="text-center text-4xl font-bold sm:text-6xl">This is wqLouis</h1>
		<h2 class="text-1xl text-center">
			<address><a href="mailto:wql-louis@outlook.com">wql-louis@outlook.com</a></address>
		</h2>
	</div>
	<section></section>
	<div class="h-px w-full bg-gray-700"></div>
	<div class="flex h-screen border-r border-gray-700">
		<div class="bg-diagonal h-full w-[15vw] border-r border-gray-700"></div>
		<div
			class="h-3xl mx-auto grid h-[60vw] w-[60vw] grid-cols-3 grid-rows-3 gap-2 p-8 sm:h-[80vh] sm:w-[80vh] sm:gap-6 [&>div]:transition-transform [&>div]:hover:z-1 [&>div]:hover:scale-110"
		>
			<div class="col-span-1 col-start-1 row-span-3">
				<Hldiv className="rounded-xl p-4">
					<div class="text-2xl font-black">Tools</div>
				</Hldiv>
			</div>
			<div class="col-span-2">
				<Hldiv className="rounded-xl p-4">
					<div class="text-2xl font-black">Tech Stack</div>
				</Hldiv>
			</div>
			<div class="col-span-1 row-span-1">
				<img
					src="https://avatars.githubusercontent.com/u/114333810?v=4"
					alt=""
					class="rounded-xl"
				/>
			</div>
			<div class="col-span-1 row-span-2">
				<Hldiv className="rounded-xl p-4">
					<div class="text-2xl font-black">About Me</div>
				</Hldiv>
			</div>
			<div class="col-span-1 row-span-1">
				<Hldiv className="rounded-xl p-4">
					<div class="text-2xl font-black">OS</div>
				</Hldiv>
			</div>
		</div>
		<div class="bg-diagonal h-full w-[15vw] border-l border-gray-700"></div>
	</div>
</main>
