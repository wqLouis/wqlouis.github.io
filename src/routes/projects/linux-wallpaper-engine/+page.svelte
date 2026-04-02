<script lang="ts">
	import { BtnAnimation } from '$lib/src/btnAnimation';
	import { onMount } from 'svelte';

	import CursorEffect from './components/CursorEffect.svelte';
	import HeroSection from './components/HeroSection.svelte';
	import InstallationSection from './components/InstallationSection.svelte';
	import FeaturesSection from './components/FeaturesSection.svelte';
	import DevelopmentStatus from './components/DevelopmentStatus.svelte';

	let cursorEnabled = true;

	onMount(() => {
		// Initialize button animations
		BtnAnimation();

		return () => {
			// Cleanup if needed
		};
	});
</script>

<section class="flex min-h-screen w-full flex-col overflow-clip bg-bg/90 text-text">
	<!-- Optional cursor effect (can be disabled) -->
	<CursorEffect enabled={cursorEnabled} />

	<!-- Fixed header -->
	<header
		class="fixed top-0 z-50 flex h-18 w-full items-center border-b-2 border-border bg-bg/80 shadow-[0_4px_12px] shadow-bg/70 backdrop-blur-md"
	>
		<span class="mx-8 text-xl font-bold text-text/80">Linux Wallpaper Engine</span>
		<button
			title="Toggle cursor effect"
			class="animate-btn mr-8 ml-auto flex size-8 cursor-pointer items-center justify-center rounded-full border border-border bg-fg/50 transition-all hover:bg-fg"
			onclick={() => (cursorEnabled = !cursorEnabled)}
		>
			<span
				class={cursorEnabled
					? 'icon-[heroicons--eye-20-solid]'
					: 'icon-[heroicons--eye-slash-20-solid]'}
			></span>
		</button>
	</header>

	<!-- Main content -->
	<main class="z-10 flex w-full flex-col bg-bg/70 pt-18 backdrop-blur-2xl">
		<HeroSection />
		<FeaturesSection />
		<InstallationSection />
		<DevelopmentStatus />

		<!-- Footer -->
		<footer class="mt-24 border-t-2 border-border/50 bg-fg/30 py-12">
			<div class="mx-auto w-11/12 max-w-6xl">
				<p class="text-center text-sm text-text/60">
					This project is developed by <a
						href="https://github.com/wqLouis"
						class="text-blue-400 hover:underline">wqLouis</a
					> • Not affiliated with Wallpaper Engine • Licensed under GPLv3
				</p>
				<p class="mt-4 text-center text-xs text-text/40">Built with Rust, Wgpu, and ❤️</p>
			</div>
		</footer>
	</main>
</section>
