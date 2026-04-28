<script lang="ts">
	export let lang: string = '';
	export let lines: Array<string> = [];

	let copied = false;

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(lines.join('\n'));
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
			const textArea = document.createElement('textarea');
			textArea.value = lines.join('\n');
			document.body.appendChild(textArea);
			textArea.select();
			try {
				document.execCommand('copy');
				copied = true;
				setTimeout(() => (copied = false), 2000);
			} catch (err2) {
				console.error('Fallback failed:', err2);
			}
			document.body.removeChild(textArea);
		}
	};
</script>

<div class="flex flex-col overflow-hidden rounded-lg border border-border/20 bg-fg/30">
	<div class="flex h-10 items-center border-b border-border/20 px-4">
		<span class="text-xs font-light tracking-wide text-text/40">{lang}</span>
		<button
			title={copied ? 'Copied!' : 'Copy to clipboard'}
			on:click={copyToClipboard}
			class="ml-auto flex size-7 cursor-pointer items-center justify-center rounded-md border border-border/20 bg-fg/50 transition-all hover:bg-fg/70"
			aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
		>
			{#if copied}
				<span class="icon-[heroicons--check-20-solid] size-4 text-text/50"></span>
			{:else}
				<span class="icon-[heroicons--square-2-stack-16-solid] size-4 text-text/40"></span>
			{/if}
		</button>
	</div>
	<div class="p-4 font-mono text-sm text-text/60">
		{#each lines as code (code)}
			<div class="py-0.5">
				<span class="mr-3 text-text/30 select-none">&gt;</span>
				<span>{code}</span>
			</div>
		{/each}
	</div>
</div>
