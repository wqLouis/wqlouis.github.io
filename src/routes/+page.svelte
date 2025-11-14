<script lang="ts">
	import { onMount } from 'svelte';
	import { smooth_scroll } from '../lib/smooth_scroll.ts';
	smooth_scroll();

	const langs = ['Python', 'C++', 'C', 'C#', 'Rust', 'TS & JS'];
	const langsLibs = [
		'OpenCV llamacpp flet sqlite chromadb numpy',
		'Qt6',
		'Nothing here yet ;)',
		'Unity game engine',
		'rocket axum',
		'Svelte',
		''
	];

	onMount(() => {
		var cards = Array.from((document.getElementById('lang-card') as HTMLDivElement).children);
		var cardLib = document.getElementById('lang-libs') as HTMLElement;
		var focus_card = 6;

		cards.forEach((val, idx, arr) => {
			var cardEle = val as HTMLElement;

			cardEle.addEventListener('mouseenter', () => {
				cardEle.classList.remove('opacity-30');
				cardEle.classList.add('opacity-100');
				focus_card = idx;
				cardLib.innerHTML = langsLibs[focus_card];
			});

			cardEle.addEventListener('mouseout', () => {
				cardEle.classList.add('opacity-30');
				cardEle.classList.remove('opacity-100');
			});
		});
	});
</script>

<section></section>
<main class="h-auto">
	<div class="mt-[35vh] mb-[45vh] [text-shadow:0_0_24px] text-shadow-slate-100">
		<h1 class="text-center text-4xl">This is wqLouis</h1>
		<h2 class="text-1xl text-center">
			<address><a href="mailto:wql-louis@outlook.com">wql-louis@outlook.com</a></address>
		</h2>
	</div>
	<section></section>
	<div class="h-px w-full bg-slate-700"></div>
	<div class="h-screen border-r border-slate-700 pt-32">
		<div class="flex border-slate-700 text-4xl">
			<div class="flex-auto border-y border-dashed border-slate-700"></div>
			<div class="flex-auto border border-slate-700 bg-slate-900 px-8 py-4 text-center">
				Tech Stack
			</div>
			<div class="flex-auto border-y border-dashed border-slate-700"></div>
		</div>
		<div class="h-40 w-full border-b border-slate-700">
			<div class="mt-8 ml-8 text-2xl">Languages</div>
			<div class="grid place-content-center">
				<div class="flex overflow-x-auto px-12 pt-8 pb-11 whitespace-nowrap" id="lang-card">
					{#each langs as lang}
						<div
							class="mx-4 max-w-32 min-w-32 border border-slate-700 bg-slate-900 p-4 text-center opacity-30 transition-all text-shadow-slate-50 hover:z-1 hover:mx-0 hover:scale-150 hover:cursor-pointer"
						>
							{lang}
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div
			class="h-24 w-full border-b border-slate-700 py-8 pl-8 text-xl text-slate-50"
			id="lang-libs"
		></div>
	</div>
</main>

<style>
	#lang-libs {
		animation: rolling 1000ms;
	}

	@keyframes rolling {
		from {
			transform: translateX(-100vw);
		}
		to {
			transform: translateX(100vw);
		}
	}
</style>
