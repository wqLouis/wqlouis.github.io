<script lang="ts">
	export let roadmap = [
		{ done: true, text: 'Improve stability and error handling' },
		{ done: false, text: 'Add support for more shader types' },
		{ done: true, text: 'Implement audio support' },
		{ done: false, text: 'Animation support' },
		{ done: false, text: '.mdl file loading' }
	];

	export let knownIssues = [
		'Video textures not supported yet',
		'Highly unstable and under heavy development',
		'Some shader types may not work correctly',
		'Performance may vary depending on hardware'
	];
</script>

<section id="development" class="flex h-max flex-col gap-12 py-12 md:py-24">
	<div class="mx-auto flex h-max w-11/12 max-w-6xl flex-col gap-12">
		<!-- Development Status -->
		<div class="flex h-max flex-col rounded-3xl border-2 border-border bg-fg p-6 md:p-8">
			<h2 class="text-center text-2xl font-bold text-text/80 md:text-3xl">Development Status</h2>

			<div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Roadmap -->
				<div class="flex flex-col">
					<h3 class="text-xl font-bold text-text/80 md:text-2xl">Roadmap</h3>
					<div class="mt-4 space-y-3">
						{#each roadmap as item (item.text)}
							<div class="flex items-center">
								{#if item.done}
									<span
										class="mr-3 icon-[heroicons--check-circle-20-solid] size-5 min-w-5 text-green-400"
									></span>
								{:else}
									<span class="mr-3 icon-[heroicons--clock-20-solid] size-5 min-w-5 text-amber-400"
									></span>
								{/if}
								<span class={item.done ? 'text-text/90' : 'text-text/60'}>
									{item.text}
								</span>
							</div>
						{/each}
					</div>
				</div>

				<!-- Known Issues -->
				<div class="flex flex-col">
					<h3 class="text-xl font-bold text-text/80 md:text-2xl">Known Issues & Limitations</h3>
					<div class="mt-4 space-y-3">
						{#each knownIssues as issue (issue)}
							<div class="flex items-start">
								<span
									class="mt-0.5 mr-3 icon-[heroicons--exclamation-circle-20-solid] size-5 min-w-5 text-red-400"
								></span>
								<span class="text-text/80">{issue}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Custom Shader Support -->
			<div class="mt-12 flex flex-col rounded-2xl border-2 border-border/70 bg-fg/70 p-6">
				<h3 class="text-xl font-bold text-text/80">Custom Shader Support?</h3>
				<p class="mt-3 text-text/80">
					Wallpaper Engine used OpenGL and GLSL which has partial support in Wgpu. I am currently
					working on implementing loading custom shaders with wgpu in the dev branch.
				</p>
			</div>
		</div>

		<!-- GitHub Badges & Disclaimer -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			<!-- GitHub Badges -->
			<div class="flex h-max flex-col rounded-3xl border-2 border-border bg-fg p-6">
				<h3 class="text-center text-xl font-bold text-text/80">GitHub</h3>
				<div class="mt-6 flex flex-wrap justify-center gap-4">
					<a
						href="https://www.rust-lang.org/"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-white"
					>
						<span class="text-sm font-bold">Rust</span>
					</a>
					<a
						href="https://github.com/gfx-rs/wgpu"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-[#FF5A03]/80 px-4 py-2 text-white"
					>
						<span class="text-sm font-bold">Wgpu</span>
					</a>
					<a
						href="https://www.vulkan.org/"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-[#AC162C]/80 px-4 py-2 text-white"
					>
						<span class="text-sm font-bold">Vulkan</span>
					</a>
					<a
						href="https://aur.archlinux.org/packages/linux-wallpaper-engine-git"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 rounded-lg bg-[#1793D1]/80 px-4 py-2 text-white"
					>
						<span class="text-sm font-bold">AUR Package</span>
					</a>
				</div>
				<p class="mt-6 text-center text-sm text-text/60">
					<a
						href="https://github.com/wqLouis/linux-wallpaperengine"
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-400 hover:underline"
					>
						View on GitHub →
					</a>
				</p>
			</div>

			<!-- Disclaimer -->
			<div class="flex h-max flex-col rounded-3xl border-2 border-red-800/30 bg-red-900/10 p-6">
				<h3 class="text-center text-xl font-bold text-text/80">Disclaimer</h3>
				<div class="mt-6 space-y-4">
					<div class="flex items-start">
						<span
							class="mt-0.5 mr-3 icon-[heroicons--shield-exclamation-20-solid] size-5 min-w-5 text-red-400"
						></span>
						<span class="text-text/80">
							This project is not affiliated with or endorsed by Wallpaper Engine.
						</span>
					</div>
					<div class="flex items-start">
						<span
							class="mt-0.5 mr-3 icon-[heroicons--shopping-cart-20-solid] size-5 min-w-5 text-green-400"
						></span>
						<span class="text-text/80">
							Please support the original software by purchasing it on Steam.
						</span>
					</div>
					<div class="flex items-start">
						<span
							class="mt-0.5 mr-3 icon-[heroicons--document-text-20-solid] size-5 min-w-5 text-blue-400"
						></span>
						<span class="text-text/80"> This project is licensed under the GPLv3 License. </span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
