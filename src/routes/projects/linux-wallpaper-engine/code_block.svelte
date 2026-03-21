<script lang="ts">
	import { onMount } from 'svelte';

	export let lang: string = '';
	export let lines: Array<string> = [];

	let copyBtn: HTMLElement;
	let copyBtnIcon: HTMLElement;

	let copyHandler = () => {
		navigator.clipboard.writeText(lines.join('\n'));
	};

	onMount(() => {
		const onclickHander = () => {
			copyBtnIcon.classList.toggle('icon-[heroicons--check-20-solid]', true);
			copyBtnIcon.classList.toggle('icon-[heroicons--square-2-stack-16-solid]', false);
		};

		const mouseLeaveHandler = () => {
			copyBtnIcon.classList.toggle('icon-[heroicons--check-20-solid]', false);
			copyBtnIcon.classList.toggle('icon-[heroicons--square-2-stack-16-solid]', true);
		};

		copyBtn.addEventListener('click', onclickHander);
		copyBtn.addEventListener('mouseleave', mouseLeaveHandler);

		return () => {
			copyBtn.removeEventListener('click', onclickHander);
			copyBtn.removeEventListener('mouseleave', mouseLeaveHandler);
		};
	});
</script>

<div class="flex flex-col gap-0">
	<div class="flex h-12 rounded-t-2xl border-2 border-mist-800/80 bg-mist-900 p-1">
		<span class="pointer-events-none my-auto pl-4 font-mono font-medium text-mist-300/80">
			{lang}
		</span>
		<button
			title="Copy"
			onclick={copyHandler}
			bind:this={copyBtn}
			class="ml-auto flex size-10 cursor-pointer rounded-xl border-2 border-mist-800/80 bg-mist-900 transition-all hover:brightness-125"
		>
			<span
				class="m-auto icon-[heroicons--square-2-stack-16-solid] size-6 text-mist-300/80"
				bind:this={copyBtnIcon}
			></span>
		</button>
	</div>
	<div
		class="rounded-b-2xl border-x-2 border-b-2 border-mist-800/80 bg-mist-950/80 p-4 font-mono font-medium text-mist-200/90"
	>
		{#each lines as code}
			<span> &gt {code}</span><br />
		{/each}
	</div>
</div>
