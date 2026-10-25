<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import * as m from '$paraglide/messages.js';
	import EmptyState from '$lib/components/list/EmptyState.svelte';
	import EntryRow from '$lib/components/list/EntryRow.svelte';
	import PageFooter from '$lib/components/list/PageFooter.svelte';
	import PageHeader from '$lib/components/list/PageHeader.svelte';
	import PageShell from '$lib/components/list/PageShell.svelte';

	const projects = $derived(page.data.projects);
	const count = $derived(projects.length);
</script>

<svelte:head>
	<title>{m.projects_page_title()}</title>
	<meta name="description" content={m.projects_page_subtitle()} />
</svelte:head>

<PageShell>
	<PageHeader
		title={m.projects_page_title()}
		backHref={resolve('/')}
		backLabel={m.projects_back_to_home()}
	/>

	{#if count === 0}
		<EmptyState text={m.common_under_construction()} />
	{:else}
		<div class="relative mt-12 border-t border-text/25 md:mt-16">
			<div class="absolute -top-px left-0 h-px w-16 bg-[var(--accent-clay)]"></div>

			{#each projects as project, i (project.slug)}
				<EntryRow
					index={String(i + 1).padStart(2, '0')}
					title={project.title}
					description={project.description}
					href={`/projects/${project.slug}`}
					tags={project.tags}
					actionLabel={m.common_project_card_view()}
					revealDelay={i * 70}
				/>
			{/each}
		</div>
	{/if}

	{#snippet footer()}
		<PageFooter notice={m.main_github_label()} noticeHref="https://github.com/wqLouis">
			{m.projects_footer_built_with()}
		</PageFooter>
	{/snippet}
</PageShell>
