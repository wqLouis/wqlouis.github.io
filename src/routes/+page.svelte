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
		<h1 class="text-center text-6xl font-bold">This is wqLouis</h1>
		<h2 class="text-1xl text-center">
			<address><a href="mailto:wql-louis@outlook.com">wql-louis@outlook.com</a></address>
		</h2>
	</div>
	<section></section>
	<div class="h-px w-full bg-gray-700"></div>
	<div class="h-screen border-r border-gray-700 pt-8">
		<div class="mx-auto h-32 w-lg">
			<Hldiv
				><div class="grid size-full place-content-center text-center text-4xl">
					<div class="font-bold [text-shadow:0_0_24px]">Tech Stack</div>
				</div></Hldiv
			>
		</div>
	</div>
</main>
