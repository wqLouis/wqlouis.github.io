<script lang="ts">
	import { resolve } from '$app/paths';
	import ReturnButton from '$lib/components/ReturnButton.svelte';
	import { Spring } from 'svelte/motion';
	import * as m from '$paraglide/messages.js';
	import HeroSection from './components/HeroSection.svelte';
	import FeaturesSection from './components/FeaturesSection.svelte';
	import InstallationSection from './components/InstallationSection.svelte';
	import DevelopmentStatus from './components/DevelopmentStatus.svelte';

	// scroll progress — driven by svelte/motion
	const progress = new Spring(0, { stiffness: 0.12, damping: 0.75 });

	$effect(() => {
		const update = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress.set(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update, { passive: true });
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	});
</script>

<svelte:head>
	<title>{m.linuxwallpaperengine_hero_title()}</title>
	<meta name="description" content={m.linuxwallpaperengine_hero_description()} />
</svelte:head>

<div class="relative min-h-screen w-full bg-bg text-text">
	<div
		class="pointer-events-none fixed top-0 left-0 z-50 h-[3px] rounded-r-full bg-[var(--accent-clay)]"
		style="width: {progress.current * 100}%"
	></div>

	<ReturnButton
		href={resolve('/projects')}
		label={m.krkr_nav_projects()}
		class="absolute top-7 left-6 z-20 md:left-10"
	/>

	<main class="flex w-full flex-col">
		<HeroSection />
		<FeaturesSection />
		<InstallationSection />
		<DevelopmentStatus />

		<footer class="mt-24 border-t border-border/40 px-6 py-12 md:px-10">
			<div
				class="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between"
			>
				<p class="text-xs font-light tracking-wide text-text/50">
					Developed by
					<a
						href="https://github.com/wqLouis"
						class="border-b border-transparent text-text/70 transition-all hover:border-text"
						>wqLouis</a
					>
					· GPLv3
				</p>
				<p class="max-w-md text-[11px] leading-relaxed font-light tracking-wide text-text/40">
					Not affiliated with Wallpaper Engine
				</p>
			</div>
		</footer>
	</main>
</div>
