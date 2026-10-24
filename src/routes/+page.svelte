<script lang="ts">
	import Cityu from '$lib/assets/others/cityu-logo.svg';
	import ProjectCard from '$lib/components/main/card.svelte';
	import { projects } from '$lib/data/projects-data';
	import TechGraph from '$lib/components/tech-graph.svelte';
	import * as m from '$paraglide/messages.js';
	import { prefersReducedMotion } from 'svelte/motion';

	let stage = $state<HTMLDivElement | undefined>();
	let avatarAnchor = $state<HTMLDivElement | undefined>();
	let avatarEl = $state<HTMLDivElement | undefined>();

	// the avatar starts in the middle and then travels to its place
	let avatarLeft = $state('50%');
	let avatarTop = $state('50%');
	let avatarScale = $state(0.82);
	let avatarOpacity = $state(0);

	function centre() {
		if (!stage || !avatarAnchor) return;
		const s = stage.getBoundingClientRect();
		const a = avatarAnchor.getBoundingClientRect();
		avatarTop = `${a.top + a.height / 2 - s.top}px`;
	}

	function land() {
		if (!stage || !avatarAnchor) return;
		const s = stage.getBoundingClientRect();
		const a = avatarAnchor.getBoundingClientRect();
		avatarLeft = `${a.left + a.width / 2 - s.left}px`;
		avatarTop = `${a.top + a.height / 2 - s.top}px`;
		avatarScale = 1;
	}

	$effect(() => {
		if (prefersReducedMotion.current) {
			avatarOpacity = 1;
			land();
			return;
		}

		const timers: ReturnType<typeof setTimeout>[] = [];

		// 1 — the avatar shows up in the middle
		timers.push(
			setTimeout(() => {
				centre();
				avatarOpacity = 1;
			}, 80)
		);

		// 2 — it travels to its place and the title flies out of it
		timers.push(setTimeout(() => land(), 620));

		const observer = new ResizeObserver(() => {
			if (avatarScale === 1) land();
		});
		if (avatarAnchor) observer.observe(avatarAnchor);

		return () => {
			timers.forEach(clearTimeout);
			observer.disconnect();
		};
	});
</script>

<main class="flex h-auto w-full flex-col overflow-clip bg-bg text-text">
	<section class="mx-auto flex h-screen w-full flex-col" id="home">
		<div bind:this={stage} class="relative mx-auto mt-[42vh] mb-auto flex cursor-default">
			<div class="mx-4 my-auto">
				<span
					class="hero-fly hero-fly-right inline-block text-3xl font-light tracking-wider"
					style="--d: 780ms">{m.main_hero_greeting()}</span
				>
				<br />
				<span
					class="hero-fly hero-fly-right inline-block text-sm font-light tracking-wide text-border"
					style="--d: 900ms">{m.main_hero_tagline()}</span
				>
			</div>
			<!-- the place the avatar travels to — a plain spacer, no outline -->
			<div bind:this={avatarAnchor} class="size-22 shrink-0"></div>

			<!-- the travelling avatar -->
			<div
				bind:this={avatarEl}
				class="hero-icon pointer-events-none absolute z-10 size-22 overflow-clip rounded-full border border-border"
				style="left: {avatarLeft}; top: {avatarTop}; transform: translate(-50%, -50%) scale({avatarScale}); opacity: {avatarOpacity};"
			>
				<img
					src="https://avatars.githubusercontent.com/u/114333810?v=4"
					alt=""
					class="size-full object-cover"
				/>
			</div>
		</div>
		<button
			class="mx-auto mb-18 flex size-8 cursor-pointer items-center justify-center rounded-sm border border-border transition-all hover:border-text active:border-2 active:border-text"
			onclick={() => {
				document.getElementById('tech-stacks')?.scrollIntoView({ behavior: 'smooth' });
			}}
			title="To next section"
		>
			<span class="icon-[heroicons--arrow-down] bg-text/50"></span>
		</button>
	</section>

	<section class="mx-auto flex h-auto min-h-max w-[70vw] min-w-max" id="tech-stacks">
		<div class="flex w-full max-w-[70vw] flex-col">
			<div class="flex w-max gap-8">
				<div class="my-8 mr-auto ml-8 text-2xl font-light tracking-wider">
					{m.main_section_tech_stacks()}
				</div>
			</div>
			<TechGraph />
		</div>
	</section>

	<section class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col" id="edu">
		<div class="mr-auto ml-8 text-2xl font-light tracking-wider">{m.main_section_education()}</div>
		<div class="relative mx-16 mt-8 flex flex-col gap-6">
			<!-- the root of the timeline -->
			<div class="flex w-8 shrink-0 items-center justify-center">
				<div
					class="flex size-16 shrink-0 items-center justify-center rounded-full border border-border bg-bg"
				>
					<img src={Cityu} alt="" class="m-auto h-7" />
				</div>
			</div>

			<!-- the rule starts at the root and runs through the entries -->
			<div class="absolute top-16 bottom-0 left-4 w-px -translate-x-1/2 bg-border"></div>

			<div class="flex">
				<div class="flex w-8 shrink-0 items-center justify-center">
					<div class="relative bg-bg p-1">
						<div class="size-2 rounded-full border border-border bg-bg"></div>
					</div>
				</div>
				<div class="my-auto text-sm font-light tracking-wide">
					<div class="text-base">{m.main_education_ee_title()}</div>
					<div class="text-xs text-text/60">{m.main_education_ee_desc()}</div>
				</div>
			</div>
			<div class="flex">
				<div class="flex w-8 shrink-0 items-center justify-center">
					<div class="relative bg-bg p-1">
						<div class="size-2 rounded-full border border-border bg-bg"></div>
					</div>
				</div>
				<div class="my-auto text-sm font-light tracking-wide">
					<div class="text-base">{m.main_education_cde_title()}</div>
					<div class="text-xs text-text/60">{m.main_education_cde_desc()}</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col" id="commercial">
		<div class="mr-auto ml-8 text-2xl font-light tracking-wider">
			{m.main_section_commercial()}
		</div>
		<div class="relative mx-16 mt-8 flex flex-col gap-6">
			<div class="absolute inset-y-0 left-4 w-px -translate-x-1/2 bg-border"></div>
			<div class="flex">
				<div class="flex w-8 shrink-0 items-center justify-center">
					<div class="relative bg-bg p-1">
						<div class="size-2 rounded-full border border-border bg-bg"></div>
					</div>
				</div>
				<div class="my-auto text-sm font-light tracking-wide">
					<div class="text-base">{m.main_commercial_rightpick_title()}</div>
					<div class="text-xs text-text/60">{m.main_commercial_rightpick_description()}</div>
				</div>
			</div>
			<div class="flex">
				<div class="flex w-8 shrink-0 items-center justify-center">
					<div class="relative bg-bg p-1">
						<div class="size-2 rounded-full border border-border bg-bg"></div>
					</div>
				</div>
				<div class="my-auto text-sm font-light tracking-wide">
					<div class="flex flex-col">
						<div class="text-base">{m.main_commercial_eduai_title()}</div>
						<div class="text-xs text-text/60">{m.main_commercial_eduai_description()}</div>
						<div class="mt-1 text-xs text-text/40 italic">{m.main_commercial_eduai_note()}</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section id="projects" class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col">
		<div class="mb-8 ml-8 text-2xl font-light tracking-wider">{m.main_section_projects()}</div>
		<div class="mx-auto mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project (project.cardTitle)}
				<ProjectCard
					link={project.link}
					cardTitle={project.cardTitle}
					image={project.image}
					tags={project.tags}
					fit={project.fit}
				/>
			{/each}
		</div>
	</section>

	<section id="findme" class="mx-auto mt-8 flex w-max min-w-[70vw] flex-col">
		<div class="mx-auto mb-16 text-center">
			<a
				class="my-2 inline-flex items-center gap-2 border-b border-transparent text-sm font-light tracking-wide text-text/60 transition-all hover:border-text"
				title="github"
				href="https://github.com/wqLouis"
				target="_blank"
			>
				<span class="icon-[octicon--mark-github-24] size-5"></span>
				{m.main_github_label()}
			</a>
			<br />
			<a
				class="my-2 inline-flex items-center gap-2 border-b border-transparent text-sm font-light tracking-wide text-text/60 transition-all hover:border-text"
				title="mail"
				href="mailto:wql-louis@outlook.com"
			>
				<span class="icon-[tabler--mail] size-5"></span>
				wql-louis@outlook.com
			</a>
		</div>
	</section>

	<span class="mx-12 mb-4 text-center text-xs font-light tracking-wide text-text/50"
		>{m.main_footer_built_with()}</span
	>
</main>
