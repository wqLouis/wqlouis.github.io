<script lang="ts">
	import HeroSection from './components/HeroSection.svelte';
	import FeaturesSection from './components/FeaturesSection.svelte';
	import InstallationSection from './components/InstallationSection.svelte';
	import DevelopmentStatus from './components/DevelopmentStatus.svelte';
</script>

<section class="flex min-h-screen w-full flex-col bg-bg/90 text-text">
	<header class="fixed top-0 z-50 flex h-16 w-full items-center px-8 backdrop-blur-md">
		<span class="text-lg font-medium text-text/70">Linux Wallpaper Engine</span>
	</header>

	<main class="z-10 flex w-full flex-col pt-16">
		<HeroSection />
		<FeaturesSection />
		<InstallationSection />
		<DevelopmentStatus />

		<footer class="mt-24 px-8 py-12">
			<div class="mx-auto max-w-2xl">
				<div class="h-px w-full bg-white/20"></div>
				<p class="mt-8 text-center text-sm text-text/70">
					Developed by <a href="https://github.com/wqLouis" class="text-text hover:underline"
						>wqLouis</a
					>
					· Not affiliated with Wallpaper Engine · GPLv3
				</p>
			</div>
		</footer>
	</main>
</section>
