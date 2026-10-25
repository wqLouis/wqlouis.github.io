<script lang="ts">
	import { t } from '$lib/i18n';
	import { onMount } from 'svelte';

	const badges = [t('neotv_hero_badges_0'), t('neotv_hero_badges_1')];
	const githubUrl = 'https://github.com/wqLouis/NeoTV';
	const githubApiUrl = 'https://api.github.com/repos/wqLouis/NeoTV/releases/latest';

	let latestVersion = $state('');

	onMount(async () => {
		try {
			const response = await fetch(githubApiUrl);
			if (response.ok) {
				const data = await response.json();
				latestVersion = data.tag_name || '';
			}
		} catch {
			latestVersion = '';
		}
	});
</script>

<section
	id="main"
	class="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-24 md:px-10"
>
	<!-- swiss grid -->
	<div
		class="pointer-events-none absolute inset-0 opacity-45"
		style="background-image:
			repeating-linear-gradient(to bottom, var(--border) 0 1px, transparent 1px 112px),
			repeating-linear-gradient(to right, var(--border) 0 1px, transparent 1px 8.3333%);"
	></div>

	<div class="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 text-center">
		<!-- the labels sit above the wordmark, like the krkr-rs kicker -->
		<div class="flex flex-wrap items-center justify-center gap-3">
			{#each badges as badge (badge)}
				<span
					class="rounded-full border border-border/60 px-3 py-1 text-[10px] font-light tracking-[0.22em] text-text/45 uppercase"
				>
					{badge}
				</span>
			{/each}
		</div>

		<h1 class="text-6xl leading-none font-medium tracking-[-0.04em] text-text md:text-8xl">
			Neo<span class="text-[var(--accent-clay)]">TV</span>
		</h1>

		<p class="max-w-xl text-xs leading-relaxed font-light tracking-wide text-text/60">
			{t('neotv_hero_description')}
		</p>

		<div class="flex flex-wrap items-center justify-center gap-4">
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 rounded-md border border-transparent bg-accent px-7 py-3 text-xs font-light tracking-wider text-bg transition-all hover:opacity-90 active:opacity-80"
			>
				<span>{t('neotv_hero_github')}</span>
				<span class="icon-[octicon--mark-github-24] size-4"></span>
			</a>
			{#if latestVersion}
				<a
					href="https://github.com/wqLouis/NeoTV/releases/tag/{latestVersion}"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center gap-2 rounded-md border border-border bg-fg px-7 py-3 text-xs font-light tracking-wider text-text transition-all hover:border-text"
				>
					<span>{latestVersion}</span>
					<span class="icon-[heroicons--arrow-down-20-solid] size-4"></span>
				</a>
			{/if}
		</div>
	</div>
</section>
