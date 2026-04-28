<script lang="ts">
	import HeroSection from './components/HeroSection.svelte';
	import FeaturesSection from './components/FeaturesSection.svelte';
</script>

<section class="flex min-h-screen w-full flex-col bg-bg text-text">
	<header
		class="fixed top-0 z-50 flex h-16 w-full items-center border-b border-border/30 bg-bg px-8"
	>
		<span class="text-sm font-light tracking-wider text-text/50">NeoTV</span>
	</header>

	<main class="z-10 flex w-full flex-col pt-16">
		<HeroSection />
		<FeaturesSection />

		<footer class="mt-24 px-8 py-12">
			<div class="mx-auto max-w-2xl">
				<div class="h-px w-full bg-border/30"></div>
				<p class="mt-8 text-center text-xs font-light tracking-wide text-text/50">
					Developed by <a
						href="https://github.com/wqLouis"
						class="border-b border-transparent text-text/60 transition-all hover:border-text"
						>wqLouis</a
					>
					· Apache-2.0 License
				</p>
			</div>
		</footer>
	</main>
</section>
