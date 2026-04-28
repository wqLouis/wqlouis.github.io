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

<div class="flex flex-col overflow-hidden rounded-lg border border-border bg-fg/30">
	<div class="flex h-9 items-center border-b border-border/20 px-4">
		<span class="text-[11px] font-light tracking-wider text-text/40">{lang}</span>
		<button
			title={copied ? 'Copied!' : 'Copy to clipboard'}
			onclick={copyToClipboard}
			class="ml-auto flex size-6 cursor-pointer items-center justify-center rounded-sm border border-transparent transition-all hover:border-text"
			aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
		>
			{#if copied}
				<span class="icon-[heroicons--check-20-solid] size-3.5 text-text/50"></span>
			{:else}
				<span class="icon-[heroicons--square-2-stack-16-solid] size-3.5 text-text/40"></span>
			{/if}
		</button>
	</div>
	<div class="p-4 font-mono text-sm text-text/60">
		{#each lines as code (code)}
			<div class="py-0.5">
				<span>{code}</span>
			</div>
		{/each}
	</div>
</div>
