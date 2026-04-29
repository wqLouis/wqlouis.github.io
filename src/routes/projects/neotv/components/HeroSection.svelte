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

<section id="main" class="flex min-h-screen items-start justify-center px-8 pt-[35vh]">
	<div class="mx-auto max-w-3xl text-center">
		<div class="mb-3 flex justify-center gap-3">
			{#each badges as badge (badge)}
				<span
					class="rounded-full border border-border/30 px-4 py-1 text-[11px] font-light tracking-wider text-text/50"
				>
					{badge}
				</span>
			{/each}
		</div>

		<h1 class="mb-6 text-4xl font-light tracking-wider md:text-5xl">{t('neotv_hero_title')}</h1>

		<p class="mb-12 text-sm font-light tracking-wide text-text/60 md:text-base">
			{t('neotv_hero_description')}
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="flex cursor-pointer items-center gap-2 rounded-sm border border-border bg-accent px-8 py-3 text-xs font-light tracking-wider text-white transition-all hover:bg-accent/90 active:bg-accent/80"
			>
				<span>{t('neotv_hero_github')}</span>
				<span class="icon-[octicon--mark-github-24] size-5"></span>
			</a>
			{#if latestVersion}
				<a
					href="https://github.com/wqLouis/NeoTV/releases/tag/{latestVersion}"
					target="_blank"
					rel="noopener noreferrer"
					class="flex cursor-pointer items-center gap-2 rounded-sm border border-border bg-accent px-8 py-3 text-xs font-light tracking-wider text-white transition-all hover:bg-accent/90 active:bg-accent/80"
				>
					<span>{latestVersion}</span>
					<span class="icon-[heroicons--arrow-down-20-solid] size-4"></span>
				</a>
			{/if}
		</div>
	</div>
</section>
