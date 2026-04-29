<script lang="ts">
	import CodeBlock from '$lib/components/code-block.svelte';
	import { t } from '$lib/i18n';

	const quickStart = [
		t('neotv_features_installDeps'),
		'bun install',
		'',
		t('neotv_features_runDev'),
		'bun run dev',
		'',
		t('neotv_features_buildWeb'),
		'bun run build',
		'',
		t('neotv_features_buildAndroid'),
		'./scripts/build-android.sh'
	];
</script>

<section id="features" class="flex flex-col px-8 py-24">
	<div class="mx-auto w-full max-w-2xl">
		<div class="space-y-12">
			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{t('neotv_features_title')}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-4">
					{#each ['neotv_features_items_0', 'neotv_features_items_1', 'neotv_features_items_2', 'neotv_features_items_3', 'neotv_features_items_4', 'neotv_features_items_5'] as key (key)}
						<li class="flex items-center text-xs font-light tracking-wide text-text/60">
							<span class="mr-3 size-1 rounded-full bg-text/30"></span>
							<span>{t(key)}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{t('neotv_features_techStack')}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<ul class="mt-6 space-y-4">
					{#each ['neotv_features_tech_0', 'neotv_features_tech_1', 'neotv_features_tech_2', 'neotv_features_tech_3'] as key (key)}
						<li class="flex items-center text-xs font-light tracking-wide text-text/60">
							<span class="mr-3 size-1 rounded-full bg-text/30"></span>
							<span>{t(key)}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{t('neotv_features_quickStart')}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<p class="mt-6 text-xs font-light tracking-wide text-text/60">
					{t('neotv_features_requirements')}
				</p>
				<div class="mt-6">
					<CodeBlock lang="bash" lines={quickStart} />
				</div>
			</div>

			<div>
				<h3 class="mb-6 text-sm font-light tracking-wider text-text/60">
					{t('neotv_features_disclaimer')}
				</h3>
				<div class="h-px w-full bg-border/20"></div>
				<p class="mt-6 text-xs font-light tracking-wide text-text/60">
					{t('neotv_features_disclaimerText')}
				</p>
			</div>
		</div>
	</div>
</section>
