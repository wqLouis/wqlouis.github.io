<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const features = [
		'Huge Resource Aggregation: Search movies, TV shows, anime and variety shows from multiple online video sources',
		'Native Cross-Platform Experience: Built on Tauri 2.0 with near-native performance for Windows, macOS, Linux, and Android',
		'Mobile Optimized: UI deeply optimized for mobile devices, ensuring comfortable operation on phones and tablets',
		'Douban Content Integration: Browse Douban highly-rated movie and TV recommendations with ranking and genre filtering',
		'Smart Source Selection: Automatically tests and selects the best playback source with HLS video support',
		'Open Source & Secure: Fully open source with transparent code, no tracking or advertisements'
	];

	const techStack = [
		'Core Framework: Tauri 2.0',
		'Frontend: Svelte 5, TailwindCSS, TypeScript',
		'Backend: Rust',
		'Video Playback: hls.js'
	];

	const quickStart = [
		'# Install dependencies',
		'bun install',
		'',
		'# Run development mode',
		'bun run dev',
		'',
		'# Build web frontend',
		'bun run build',
		'',
		'# Build Android APK',
		'./scripts/build-android.sh'
	];
</script>

<section id="features" class="flex flex-col px-8 py-24">
	<div class="mx-auto w-full max-w-2xl">
		<div class="space-y-12">
			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">Features</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-4">
					{#each features as feature (feature)}
						<li class="flex items-center text-xs font-light tracking-wide text-text/60">
							<span class="mr-3 size-1 rounded-full bg-text/30"></span>
							<span>{feature}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">Tech Stack</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-4">
					{#each techStack as tech (tech)}
						<li class="flex items-center text-xs font-light tracking-wide text-text/60">
							<span class="mr-3 size-1 rounded-full bg-text/30"></span>
							<span>{tech}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">Quick Start</h3>
				<div class="h-px w-full bg-border/20"></div>
				<p class="mt-6 text-xs font-light tracking-wide text-text/60">
					Requirements: Node.js 18+, Rust 1.77+
				</p>
				<div class="mt-6">
					<CodeBlock lang="bash" lines={quickStart} />
				</div>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">Disclaimer</h3>
				<div class="h-px w-full bg-border/20"></div>
				<p class="mt-6 text-xs font-light tracking-wide text-text/60">
					NeoTV is only a video search tool and does not store, upload, or distribute any video
					content. All videos come from third-party API search results. If there is infringing
					content, please contact the respective content provider. The developers of this project
					are not responsible for any consequences arising from the use of this project. You must
					comply with local laws and regulations when using this project.
				</p>
			</div>
		</div>
	</div>
</section>
