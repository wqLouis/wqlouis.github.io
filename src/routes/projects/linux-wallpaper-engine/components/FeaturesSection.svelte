<script lang="ts">
	export let videoUrl =
		'https://github.com/user-attachments/assets/3a2a6ed8-ddf5-4f0a-8c0d-80f8fcfc4af0';
	export let features = [
		'Scene Parsing: Reads and parses .scene.pkg files from Wallpaper Engine',
		'Rendering: Hardware-accelerated rendering using wgpu (Vulkan + Metal)',
		'Texture Support: Handles texture loading with automatic alignment and format conversion'
	];
	export let requirements = [
		'Rust (Latest stable version)',
		'Vulkan Drivers: Ensure your GPU drivers support Vulkan (Mesa for AMD/Intel, proprietary drivers for Nvidia)',
		'MacOS Support: Not fully tested but should work with Metal backend',
		'Wallpaper Engine Assets: Legal access to .pkg files via purchased copy of Wallpaper Engine on Steam'
	];
</script>

<section id="features" class="flex h-max flex-col gap-12 py-12 md:py-24">
	<div class="mx-auto flex h-max w-11/12 max-w-6xl flex-col gap-12">
		<!-- Video Demo -->
		<div class="flex h-max flex-col rounded-3xl border-2 border-border bg-fg p-6 md:p-8">
			<h2 class="text-center text-2xl font-bold text-text/80 md:text-3xl">Demo</h2>
			<div class="mt-8 aspect-video w-full overflow-hidden rounded-2xl border-2 border-border/70">
				<video
					src={videoUrl}
					controls
					class="h-full w-full object-cover"
					preload="metadata"
					poster="https://raw.githubusercontent.com/wqLouis/linux-wallpaperengine/master/.github/images/preview.png"
					aria-label="Demo video showing Linux Wallpaper Engine in action"
				>
					<track kind="captions" label="English" srclang="en" />
					Your browser does not support the video tag.
					<a href={videoUrl} class="text-blue-400 underline">Download the video</a>
				</video>
			</div>
			<p class="mt-4 text-center text-sm text-text/60">
				Showcase of Linux Wallpaper Engine in action
			</p>
		</div>

		<!-- Features & Requirements Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
			<!-- Features -->
			<div class="flex h-max flex-col rounded-3xl border-2 border-border bg-fg p-6">
				<h3 class="text-center text-xl font-bold text-text/80 md:text-2xl">Features</h3>
				<ul class="mt-6 space-y-4">
					{#each features as feature (feature)}
						<li class="flex items-start">
							<span
								class="mt-0.5 mr-3 icon-[heroicons--check-circle-20-solid] size-5 text-green-400"
							></span>
							<span class="text-text/80">{feature}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Requirements -->
			<div class="flex h-max flex-col rounded-3xl border-2 border-border bg-fg p-6">
				<h3 class="text-center text-xl font-bold text-text/80 md:text-2xl">Requirements</h3>
				<ul class="mt-6 space-y-4">
					{#each requirements as requirement (requirement)}
						<li class="flex items-start">
							<span
								class="mt-0.5 mr-3 icon-[heroicons--information-circle-20-solid] size-5 text-blue-400"
							></span>
							<span class="text-text/80">{requirement}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Usage -->
		<div class="flex h-max flex-col rounded-3xl border-2 border-border bg-fg p-6">
			<h3 class="text-center text-xl font-bold text-text/80 md:text-2xl">Usage</h3>
			<div class="mt-6">
				<p class="mb-4 text-text/80">
					After installation, run the following command to start the wallpaper engine:
				</p>
				<div
					class="rounded-2xl border-2 border-border/70 bg-mist-950/80 p-4 font-mono text-mist-200/90"
				>
					<span>&gt; linux-wallpaper-engine -p &#123;path to pkg file&#125;</span>
				</div>
				<p class="mt-4 text-sm text-text/60">
					Replace <code class="rounded bg-fg/50 px-1 py-0.5">&#123;path to pkg file&#125;</code>
					with the path to your Wallpaper Engine
					<code class="rounded bg-fg/50 px-1 py-0.5">.pkg</code> file.
				</p>
			</div>
		</div>
	</div>
</section>
