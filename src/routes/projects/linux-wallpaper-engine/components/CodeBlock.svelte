<script lang="ts">
	export let lang: string = '';
	export let lines: Array<string> = [];

	let copied = false;
	let copyButton: HTMLButtonElement;

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(lines.join('\n'));
			copied = true;

			// Reset copied state after 2 seconds
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
			// Fallback for older browsers
			const textArea = document.createElement('textarea');
			textArea.value = lines.join('\n');
			document.body.appendChild(textArea);
			textArea.select();
			try {
				document.execCommand('copy');
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 2000);
			} catch (err2) {
				console.error('Fallback copy failed: ', err2);
			}
			document.body.removeChild(textArea);
		}
	};
</script>

<div
	class="flex flex-col gap-0 overflow-hidden rounded-2xl border-2 border-mist-800/80 bg-mist-950/80"
>
	<div class="flex h-12 items-center border-b-2 border-mist-800/80 bg-mist-900 p-1 px-4">
		<span class="pointer-events-none font-mono text-sm font-medium text-mist-300/80">
			{lang}
		</span>
		<button
			title={copied ? 'Copied!' : 'Copy to clipboard'}
			on:click={copyToClipboard}
			bind:this={copyButton}
			class="animate-btn ml-auto flex size-8 cursor-pointer items-center justify-center rounded-lg border border-mist-800/80 bg-mist-900 transition-all hover:bg-mist-800 active:scale-95"
			aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
		>
			{#if copied}
				<span class="icon-[heroicons--check-20-solid] size-5 text-green-400"></span>
			{:else}
				<span class="icon-[heroicons--square-2-stack-16-solid] size-5 text-mist-300/80"></span>
			{/if}
		</button>
	</div>
	<div class="p-4 font-mono text-sm font-medium text-mist-200/90">
		{#each lines as code (code)}
			<div class="py-0.5">
				<span class="mr-2 text-mist-500/80 select-none">&gt;</span>
				<span class="text-mist-200/90">{code}</span>
			</div>
		{/each}
	</div>
</div>
