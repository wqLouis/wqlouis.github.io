<script lang="ts">
	import ProjectCard from './card.svelte';
	import { projects } from '$lib/data/projects-data';
</script>

<!--
	The projects sit on one grid: a single column on a phone, two on a
	tablet, three on a desktop. Every card keeps the same height inside
	its row and the section never grows wider than the page.
-->
<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
	{#each projects as project, i (project.cardTitle)}
		<div class="min-w-0">
			<ProjectCard
				link={project.link}
				cardTitle={project.cardTitle}
				description={project.description}
				image={project.image}
				tags={project.tags}
				fit={project.fit}
				index={String(i + 1).padStart(2, '0')}
			/>
		</div>
	{/each}
</div>
