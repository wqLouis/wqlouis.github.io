<script lang="ts">
	import { smooth_scroll } from '../lib/smooth_scroll.ts';
	smooth_scroll();

	let langs = ['Python', 'C++', 'C', 'C#', 'Rust', 'TypeScript', 'JavaScript'];

	const fadeArr = (arr: Array<string>) => {
		var new_arr: Array<{ val: string; opa: string }> = [];
		arr.forEach((value, idx, list) => {
			new_arr.push({
				val: value,
				opa: (idx / list.length).toString()
			});
		});
		return new_arr;
	};

	const tech_stack_lang_cards = fadeArr(langs);
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
				<div class="flex overflow-x-auto pt-8 pb-11 whitespace-nowrap" id="lang-card">
					{#each tech_stack_lang_cards as lang}
						<div
							class="{lang.opa} mx-4 max-w-32 min-w-32 border border-slate-700 bg-slate-900 p-4 text-center transition-all text-shadow-slate-50 hover:mx-16 hover:scale-150"
						>
							{lang.val}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>
