<script lang="ts">
	import HeroSection from './components/HeroSection.svelte';
	import StatsSection from './components/StatsSection.svelte';
	import FeaturesSection from './components/FeaturesSection.svelte';
	import ArchitectureSection from './components/ArchitectureSection.svelte';
	import QuickStartSection from './components/QuickStartSection.svelte';
	import { Spring } from 'svelte/motion';
	import { t } from '$lib/i18n';

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
	<title>krkr-rs — {t('krkr_hero_title')}</title>
	<meta name="description" content={t('krkr_hero_description')} />
</svelte:head>

<div class="krkr-page relative min-h-screen w-full bg-bg text-text">
	<div
		class="pointer-events-none fixed top-0 left-0 z-50 h-[3px] rounded-r-full bg-[var(--accent-clay)]"
		style="width: {progress.current * 100}%"
	></div>

	<main class="flex w-full flex-col">
		<HeroSection />
		<StatsSection />
		<FeaturesSection />
		<ArchitectureSection />
		<QuickStartSection />

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
					· {t('krkr_footer_license')}
				</p>
				<p class="max-w-md text-[11px] leading-relaxed font-light tracking-wide text-text/40">
					{t('krkr_footer_notice')}
				</p>
			</div>
		</footer>
	</main>
</div>

<style>
	.krkr-page {
		font-family: 'Helvetica Neue', Helvetica, Arial, 'Inter', system-ui, sans-serif;
	}

	.krkr-page ::selection {
		background: #d76b3f;
		color: #f8f6f0;
	}
</style>
