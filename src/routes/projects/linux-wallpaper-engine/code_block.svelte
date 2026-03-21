<script lang="ts">
	import { onMount } from 'svelte';

	export let lang: string = '';
	export let lines: Array<string> = [];

	let copyHandler = () => {
		navigator.clipboard.writeText(lines.join('\n'));
	};
</script>

<div class="flex flex-col rounded-2xl border-2 border-mist-800/80 bg-mist-900">
	<div class="flex h-12 border-b-2 border-mist-800/80 p-1">
		<span class="pointer-events-none my-auto pl-4 font-mono font-medium text-mist-300/80">
			{lang}
		</span>
		<button
			title="Copy"
			onclick={copyHandler}
			class="ml-auto flex size-10 cursor-pointer rounded-xl border-2 border-mist-800/80 bg-mist-900 transition-all hover:brightness-125"
		>
			<span class="m-auto icon-[heroicons--square-2-stack-16-solid] size-6 text-mist-300/80"></span>
		</button>
	</div>
	<div class="p-4 font-mono font-medium text-mist-200/90">
		{#each lines as code}
			<span> &gt {code}</span><br />
		{/each}
	</div>
</div>
