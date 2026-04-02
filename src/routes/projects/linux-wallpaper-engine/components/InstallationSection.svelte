<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	export let aurCommand1 = 'paru -S linux-wallpaper-engine-git';
	export let aurCommand2 = 'yay -S linux-wallpaper-engine-git';
	export let sourceCommands = [
		'git clone https://github.com/wqLouis/linux-wallpaperengine.git',
		'cd linux-wallpaperengine',
		'cargo install --path . --profile=release'
	];
</script>

<section id="installation" class="flex h-max flex-col gap-12 py-12 md:py-24">
	<div
		class="mx-auto flex h-max w-11/12 max-w-6xl flex-col rounded-3xl border-2 border-border bg-fg p-6 md:p-8"
	>
		<h2 class="text-center text-2xl font-bold text-text/80 md:text-3xl">Installation</h2>

		<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
			<!-- AUR Installation -->
			<div
				class="flex h-max flex-col rounded-2xl border-2 border-border/70 bg-fg/70 p-4 backdrop-blur-2xl"
			>
				<h3 class="mx-4 mt-2 text-xl font-bold text-text/80 md:text-2xl">Install From AUR</h3>
				<div class="my-6 flex flex-col gap-6">
					<CodeBlock lang="bash" lines={[aurCommand1]} />
					<CodeBlock lang="bash" lines={[aurCommand2]} />
				</div>
				<p class="mx-4 mt-4 text-sm text-text/60">
					For Arch Linux users, the package is available in the AUR as <code
						class="rounded bg-fg/50 px-1 py-0.5">linux-wallpaper-engine-git</code
					>
				</p>
			</div>

			<!-- Source Installation -->
			<div
				class="flex h-max flex-col rounded-2xl border-2 border-border/70 bg-fg/70 p-4 backdrop-blur-2xl"
			>
				<h3 class="mx-4 mt-2 text-xl font-bold text-text/80 md:text-2xl">Build from source</h3>
				<div class="my-4">
					<h4 class="mx-4 font-bold text-text/80">Build Dependencies:</h4>
					<ul class="mx-8 mb-6 list-decimal font-bold text-text/80">
						<li>Cargo (Rust toolchain)</li>
						<li>Git</li>
						<li>Vulkan Drivers (Mesa for AMD/Intel, proprietary for Nvidia)</li>
					</ul>
				</div>
				<CodeBlock lang="bash" lines={sourceCommands} />
			</div>
		</div>

		<!-- Warning/Note -->
		<div
			class="mt-12 flex h-max flex-col rounded-2xl border-2 border-amber-800/50 bg-amber-900/20 px-6 pt-4 pb-6 font-medium text-text/80"
		>
			<div class="my-4 flex items-center">
				<span class="icon-[heroicons--exclamation-triangle-20-solid] size-6 min-w-6 text-amber-300"
				></span>
				<span class="ml-3 text-center font-bold">After installation</span>
			</div>
			<p class="text-sm md:text-base">
				Ensure you have installed Wallpaper Engine from Steam to get the wallpaper assets from
				workshop. This project requires legal access to <code class="rounded bg-fg/50 px-1 py-0.5"
					>.pkg</code
				> files from a purchased copy of Wallpaper Engine.
			</p>
		</div>
	</div>
</section>
