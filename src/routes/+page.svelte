<script lang="ts">
	import Cityu from '$lib/assets/others/cityu-logo.svg';
	import ProjectCard from '$lib/components/main/card.svelte';
	import SectionHeader from '$lib/components/main/section-header.svelte';
	import { projects } from '$lib/data/projects-data';
	import TechRoulette from '$lib/components/tech-roulette.svelte';
	import * as m from '$paraglide/messages.js';
	import { Spring, prefersReducedMotion } from 'svelte/motion';

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

<div
	class="pointer-events-none fixed top-0 left-0 z-50 h-[3px] rounded-r-full bg-[var(--accent-clay)]"
	style="width: {progress.current * 100}%"
></div>

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

	<!-- 01 — the stack roulette -->
	<section
		class="mx-auto flex w-full max-w-6xl flex-col px-6 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32"
		id="tech-stacks"
	>
		<SectionHeader index="01" title={m.main_section_tech_stacks()} />
		<div class="mt-12 md:mt-16">
			<TechRoulette />
		</div>
	</section>

	<!-- 02 — education -->
	<section class="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 md:px-10 md:pb-32" id="edu">
		<SectionHeader index="02" title={m.main_section_education()} />

		<div class="relative mt-12 flex flex-col gap-8 md:mt-16 md:pl-16">
			<!-- the root of the timeline -->
			<div class="flex items-center gap-5">
				<div
					class="flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-bg"
				>
					<img src={Cityu} alt="" class="m-auto h-6" />
				</div>
			</div>

			<!-- the rule starts at the root and runs through the entries -->
			<div class="absolute top-14 bottom-0 left-7 w-px bg-border md:left-7"></div>

			<div class="relative flex gap-5">
				<div class="flex w-7 shrink-0 items-center justify-center">
					<div class="relative bg-bg p-1">
						<div class="size-2 rounded-full border border-border bg-bg"></div>
					</div>
				</div>
				<div class="flex flex-col gap-1 pb-2">
					<div class="text-base font-light tracking-wider text-text">
						{m.main_education_ee_title()}
					</div>
					<div class="text-xs leading-relaxed font-light tracking-wide text-text/60">
						{m.main_education_ee_desc()}
					</div>
				</div>
			</div>

			<div class="relative flex gap-5">
				<div class="flex w-7 shrink-0 items-center justify-center">
					<div class="relative bg-bg p-1">
						<div class="size-2 rounded-full border border-border bg-bg"></div>
					</div>
				</div>
				<div class="flex flex-col gap-1 pb-2">
					<div class="text-base font-light tracking-wider text-text">
						{m.main_education_cde_title()}
					</div>
					<div class="text-xs leading-relaxed font-light tracking-wide text-text/60">
						{m.main_education_cde_desc()}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- 03 — commercial work -->
	<section
		class="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 md:px-10 md:pb-32"
		id="commercial"
	>
		<SectionHeader index="03" title={m.main_section_commercial()} />

		<div class="relative mt-12 flex flex-col gap-8 md:mt-16 md:pl-16">
			<div class="absolute inset-y-0 left-7 w-px bg-border"></div>

			<div class="relative flex gap-5">
				<div class="flex w-7 shrink-0 items-center justify-center">
					<div class="relative bg-bg p-1">
						<div class="size-2 rounded-full border border-border bg-bg"></div>
					</div>
				</div>
				<div class="flex flex-col gap-1 pb-2">
					<div class="text-base font-light tracking-wider text-text">
						{m.main_commercial_rightpick_title()}
					</div>
					<div class="text-xs leading-relaxed font-light tracking-wide text-text/60">
						{m.main_commercial_rightpick_description()}
					</div>
				</div>
			</div>

			<div class="relative flex gap-5">
				<div class="flex w-7 shrink-0 items-center justify-center">
					<div class="relative bg-bg p-1">
						<div class="size-2 rounded-full border border-border bg-bg"></div>
					</div>
				</div>
				<div class="flex flex-col gap-1 pb-2">
					<div class="text-base font-light tracking-wider text-text">
						{m.main_commercial_eduai_title()}
					</div>
					<div class="text-xs leading-relaxed font-light tracking-wide text-text/60">
						{m.main_commercial_eduai_description()}
					</div>
					<div class="text-xs leading-relaxed font-light tracking-wide text-text/40 italic">
						{m.main_commercial_eduai_note()}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- 04 — projects -->
	<section
		class="mx-auto flex w-full max-w-6xl flex-col px-6 pb-24 md:px-10 md:pb-32"
		id="projects"
	>
		<SectionHeader index="04" title={m.main_section_projects()} />

		<div class="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, i (project.cardTitle)}
				<ProjectCard
					link={project.link}
					cardTitle={project.cardTitle}
					image={project.image}
					tags={project.tags}
					fit={project.fit}
					index={String(i + 1).padStart(2, '0')}
				/>
			{/each}
		</div>
	</section>

	<!-- contact -->
	<section id="findme" class="mx-auto flex w-full max-w-6xl flex-col px-6 py-20 md:px-10">
		<div class="flex flex-col items-center gap-4">
			<a
				class="inline-flex items-center gap-2 border-b border-transparent text-sm font-light tracking-wide text-text/60 transition-all hover:border-text"
				title="github"
				href="https://github.com/wqLouis"
				target="_blank"
				rel="noreferrer"
			>
				<span class="icon-[octicon--mark-github-24] size-5"></span>
				{m.main_github_label()}
			</a>
			<a
				class="inline-flex items-center gap-2 border-b border-transparent text-sm font-light tracking-wide text-text/60 transition-all hover:border-text"
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
