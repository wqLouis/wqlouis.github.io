<script lang="ts">
	import CodeBlock from '$lib/components/code-block.svelte';
	import * as m from '$paraglide/messages.js';

	const aurCommands = [
		m.linuxwallpaperengine_aur_commands_0(),
		m.linuxwallpaperengine_aur_commands_1()
	];
	const sourceCommands = [
		m.linuxwallpaperengine_source_commands_0(),
		m.linuxwallpaperengine_source_commands_1(),
		m.linuxwallpaperengine_source_commands_2()
	];
</script>

<section id="installation" class="flex flex-col px-8 py-24">
	<div class="mx-auto w-full max-w-2xl">
		<h2 class="mb-16 text-center text-xl font-light tracking-wider text-text/70">
			{m.linuxwallpaperengine_installation_title()}
		</h2>

		<div class="space-y-16">
			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{m.linuxwallpaperengine_aur_title()}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<div class="mt-6 space-y-3">
					{#each aurCommands as cmd (cmd)}
						<CodeBlock lang="bash" lines={[cmd]} />
					{/each}
				</div>
				<p class="mt-4 text-xs font-light tracking-wide text-text/60">
					{m.linuxwallpaperengine_aur_hint()}
					<code class="rounded-sm border border-border/30 px-1 py-0.5 text-[11px]"
						>{m.linuxwallpaperengine_aur_package()}</code
					>
				</p>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{m.linuxwallpaperengine_source_title()}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<p class="mt-6 text-xs font-light tracking-wide text-text/60">
					{m.linuxwallpaperengine_source_dependencies()}
				</p>
				<div class="mt-4">
					<CodeBlock lang="bash" lines={sourceCommands} />
				</div>
			</div>
		</div>

		<div class="mt-16 rounded-md border border-border/30 bg-fg/20 px-6 py-5">
			<p class="text-xs font-light tracking-wide text-text/60">
				{m.linuxwallpaperengine_pkg_hint()}
				<code class="rounded-sm border border-border/30 px-1 py-0.5 text-[11px]"
					>{m.linuxwallpaperengine_pkg_extension()}</code
				>
				{m.linuxwallpaperengine_pkg_hint_suffix()}
			</p>
		</div>
	</div>
</section>
