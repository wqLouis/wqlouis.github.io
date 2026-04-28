<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const aurCommands = ['paru -S linux-wallpaper-engine-git', 'yay -S linux-wallpaper-engine-git'];
	const sourceCommands = [
		'git clone https://github.com/wqLouis/linux-wallpaperengine.git',
		'cd linux-wallpaperengine',
		'cargo install --path . --profile=release'
	];
</script>

<section id="installation" class="flex flex-col px-8 py-24">
	<div class="mx-auto w-full max-w-2xl">
		<h2 class="mb-16 text-center text-2xl font-light tracking-wide text-text/80">Installation</h2>

		<div class="space-y-16">
			<div>
				<h3 class="mb-6 text-lg font-light tracking-wide text-text/70">AUR</h3>
				<div class="h-px w-full bg-white/20"></div>
				<div class="mt-6 space-y-3">
					{#each aurCommands as cmd (cmd)}
						<CodeBlock lang="bash" lines={[cmd]} />
					{/each}
				</div>
				<p class="mt-4 text-sm text-text/70">
					For Arch Linux users, available in the AUR as
					<code>linux-wallpaper-engine-git</code>
				</p>
			</div>

			<div>
				<h3 class="mb-6 text-lg font-light tracking-wide text-text/70">Build from source</h3>
				<div class="h-px w-full bg-white/20"></div>
				<p class="mt-6 text-sm font-medium text-text/70">
					Dependencies: Cargo, Git, Vulkan Drivers
				</p>
				<div class="mt-4">
					<CodeBlock lang="bash" lines={sourceCommands} />
				</div>
			</div>
		</div>

		<div class="mt-16 rounded-lg border border-border/20 bg-fg/20 px-6 py-5">
			<p class="text-sm text-text/70">
				Requires Wallpaper Engine from Steam for <code>.pkg</code> files.
			</p>
		</div>
	</div>
</section>
