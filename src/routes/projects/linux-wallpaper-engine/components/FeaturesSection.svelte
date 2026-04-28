<script lang="ts">
	const videoUrl =
		'https://github.com/user-attachments/assets/3a2a6ed8-ddf5-4f0a-8c0d-80f8fcfc4af0';
	const features = [
		'Scene Parsing: Reads and parses .scene.pkg files from Wallpaper Engine',
		'Rendering: Hardware-accelerated rendering using wgpu (Vulkan + Metal)',
		'Texture Support: Handles texture loading with automatic alignment and format conversion'
	];
	const requirements = [
		'Rust (Latest stable version)',
		'Vulkan Drivers: Ensure your GPU drivers support Vulkan (Mesa for AMD/Intel, proprietary drivers for Nvidia)',
		'MacOS Support: Not fully tested but should work with Metal backend',
		'Wallpaper Engine Assets: Legal access to .pkg files via purchased copy of Wallpaper Engine on Steam'
	];
</script>

<section id="features" class="flex flex-col px-8 py-24">
	<div class="mx-auto w-full max-w-2xl">
		<h2 class="mb-16 text-center text-2xl font-light tracking-wide text-text/80">Demo</h2>

		<div class="aspect-video w-full overflow-hidden rounded-xl">
			<video
				src={videoUrl}
				controls
				class="h-full w-full object-cover"
				preload="metadata"
				poster="https://raw.githubusercontent.com/wqLouis/linux-wallpaperengine/master/.github/images/preview.png"
			>
				Your browser does not support the video tag.
				<a href={videoUrl} class="text-text/70 underline">Download</a>
			</video>
		</div>

		<div class="mt-16 space-y-12">
			<div>
				<h3 class="mb-6 text-lg font-light tracking-wide text-text/70">Features</h3>
				<div class="h-px w-full bg-white/20"></div>
				<ul class="mt-6 space-y-4">
					{#each features as feature (feature)}
						<li class="flex items-center text-text/70">
							<span class="mr-3 size-1.5 rounded-full bg-text/30"></span>
							<span>{feature}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-lg font-light tracking-wide text-text/70">Requirements</h3>
				<div class="h-px w-full bg-white/20"></div>
				<ul class="mt-6 space-y-4">
					{#each requirements as requirement (requirement)}
						<li class="flex items-center text-text/70">
							<span class="mr-3 size-1.5 rounded-full bg-text/30"></span>
							<span>{requirement}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-lg font-light tracking-wide text-text/70">Usage</h3>
				<div class="h-px w-full bg-white/20"></div>
				<p class="mt-6 text-text/70">Run the following command:</p>
				<div class="mt-4 rounded-lg bg-fg/40 p-4 font-mono text-sm text-text/70">
					&gt; linux-wallpaper-engine -p &#123;path to pkg file&#125;
				</div>
			</div>
		</div>
	</div>
</section>
