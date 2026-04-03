<script lang="ts">
	import IconGrid from '$lib/components/IconGrid.svelte';
	import {
		languageIcons,
		frontendIcons,
		backendIcons,
		devopsIcons,
		gameDevIcons
	} from '$lib/data/tech-icons';
	import Cityu from '$lib/assets/others/CityU_logo.svg';
	import Marquee from '$lib/components/marquee.svelte';
	import ProjectCard from '$lib/components/main/card.svelte';
	import PersonalWebsite from '$lib/assets/others/PersonalWebsite.png';
	import TreeRs from '$lib/assets/others/treers.png';
	import Depkg from '$lib/assets/others/depkg.png';
	import Yawe from '$lib/assets/others/yawe.png';

	import { btnAnimation } from '$lib/actions/animations';
</script>

<main use:btnAnimation class="flex h-auto w-full flex-col overflow-clip bg-bg text-text">
	<section class="mx-auto flex h-screen w-full flex-col" id="home">
		<div class="mx-auto mt-[42vh] mb-auto flex cursor-default">
			<div class="mx-4 my-auto">
				<span class="text-2xl">Hi, I am wqLouis</span> <br />
				<span class="text-xs font-bold text-border">I write bugs ;)</span>
			</div>
			<div class="size-24 overflow-clip rounded-full shadow-[0_0_4px] shadow-border/50">
				<img src="https://avatars.githubusercontent.com/u/114333810?v=4" alt="" />
			</div>
		</div>
		<button
			class="animate-btn mx-auto mb-18 flex size-8 animate-bounce cursor-pointer rounded-full border-2 border-border bg-fg transition-all hover:shadow-[0_2px_8px] hover:shadow-border"
			onclick={() => {
				document.getElementById('tech-stacks')?.scrollIntoView({ behavior: 'smooth' });
			}}
			title="To next section"
		>
			<span class="m-auto icon-[heroicons--arrow-down] bg-text/50"></span>
		</button>
	</section>
	<section class="mx-auto flex h-auto min-h-max w-[70vw] min-w-max" id="tech-stacks">
		<div class="flex max-w-[70vw] flex-col">
			<div class="flex w-max gap-8">
				<div class="my-8 mr-auto ml-8 text-2xl font-bold">Tech Stacks</div>
				<button
					class="animate-btn mx-auto my-auto flex h-8 w-26 cursor-pointer rounded-full border-2 border-border bg-fg transition-all hover:shadow-[0_0_8px] hover:shadow-border"
					onclick={(event) => {
						const btn = event.currentTarget;
						const table = document.getElementById('tech-stacks-table');
						const toggle = (classArr: string[]) => {
							classArr.forEach((i) => {
								table?.classList.toggle(i);
							});

							const children = Array.from(btn.children);
							const icon = children.filter((x) => x instanceof HTMLSpanElement)[0];
							const text = children.filter((x) => x instanceof HTMLDivElement)[0] as HTMLElement;
							text.innerText = text.innerText == 'See More' ? 'See Less' : 'See More';
							icon.classList.toggle('rotate-180');
						};
						toggle(['h-0', 'h-300', 'opacity-0', 'sm:h-200']);
						const animationHandler = () => {
							table?.removeEventListener('transitionend', animationHandler);
						};
						table?.addEventListener('transitionend', animationHandler, { once: true });
					}}
					title="Toggle table"
				>
					<div class="my-auto mr-auto ml-2 text-xs font-bold text-text/50">See More</div>
					<span
						class="my-auto mr-2 ml-auto icon-[heroicons--chevron-down] size-4 bg-text/50 transition-all"
					></span>
				</button>
			</div>
			<Marquee time="70s"
				><IconGrid icons={languageIcons} /><IconGrid icons={frontendIcons} /><IconGrid
					icons={backendIcons}
				/><IconGrid icons={devopsIcons} /><IconGrid icons={gameDevIcons} />
			</Marquee>
			<div class="h-0 overflow-clip opacity-0 transition-all duration-1000" id="tech-stacks-table">
				<div class="mx-auto grid w-full grid-cols-1 sm:grid-cols-2 lg:w-4/5">
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Languages</div>
						<div class="mx-auto grid w-auto grid-cols-3 place-items-center gap-6">
							<IconGrid icons={languageIcons} className="grayscale-0" />
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Frontend</div>
						<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
							<IconGrid icons={frontendIcons} className="grayscale-0" />
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Backend</div>
						<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
							<IconGrid icons={backendIcons} className="grayscale-0" />
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Dev Ops</div>
						<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
							<IconGrid icons={devopsIcons} className="grayscale-0" />
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Game Dev</div>
					<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
						<IconGrid icons={gameDevIcons} className="grayscale-0" />
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col" id="edu">
		<div class="mr-auto ml-8 text-2xl font-bold">Education</div>
		<div class="mx-16 mt-8 flex">
			<div class="h-full w-8">
				<div
					class="mx-auto my-1 h-4 w-1 rounded-full bg-linear-to-b from-transparent to-border"
				></div>
				<div class="mx-auto size-3 rounded-full bg-border">
					<div class="absolute size-3 animate-ping rounded-full bg-border/50"></div>
				</div>
				<div
					class="mx-auto my-1 h-4 w-1 rounded-full bg-linear-to-t from-transparent to-border"
				></div>
			</div>
			<div class="my-auto flex text-sm font-semibold">
				<div class="hidden size-16 rounded-full border-2 border-border bg-fg sm:flex">
					<img src={Cityu} alt="" class="m-auto h-6" />
				</div>
				<div class="mx-2 my-auto">
					<div class="">CityUHK (2025~)</div>
					<div class="">Bachelor's student in Electrical Engineering</div>
				</div>
			</div>
		</div>
	</section>
	<section id="projects" class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col">
		<div class="mb-8 ml-8 text-2xl font-bold">Previous Projects</div>
		<div class="mx-auto mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			<ProjectCard
				link="https://github.com/wqLouis/paper_check"
				content="A python paddle ocr wrapper, built with flet."
				cardTitle="Paper Check"
			></ProjectCard>
			<ProjectCard
				link="https://github.com/wqLouis/wqlouis.github.io"
				content="My personal website built with Tailwindcss and Svelte."
				image={PersonalWebsite}
				cardTitle="My website"
			></ProjectCard>
			<ProjectCard
				link="https://github.com/wqLouis/tree-rs"
				content="A simple cli tools written in Rust."
				image={TreeRs}
				cardTitle="Tree rs"
			></ProjectCard>
		</div>
	</section>
	<section id="current-projects" class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col">
		<div class="mb-8 ml-8 text-2xl font-bold">Current Projects</div>
		<div class="mx-auto mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
			<ProjectCard
				link="https://github.com/wqLouis/depkg"
				content="A wallpaper engine pkg and tex file decompiler written in Rust"
				cardTitle="depkg"
				image={Depkg}
			></ProjectCard>
			<ProjectCard
				link="https://github.com/wqLouis/linux-wallpaper-engine"
				content="A linux port of wallpaper engine. Written in Rust with WGPU"
				cardTitle="linux wallpaper engine"
				image={Yawe}
			></ProjectCard>
		</div>
	</section>
	<section id="findme" class="mx-auto mt-8 flex w-max min-w-[70vw] flex-col">
		<div class="mx-auto mb-16 flex size-64 rounded-full border-2 border-border">
			<div class="m-auto flex size-32 rounded-full border-2 border-border">
				<a
					class="animate-btn my-auto mr-auto flex size-10 -translate-x-1/2 cursor-pointer rounded-full border-2 border-border bg-fg shadow-border transition-all hover:shadow-[0_0_4px]"
					title="github"
					href="https://github.com/wqLouis"
					target="_blank"
				>
					<span class="m-auto icon-[octicon--mark-github-24] size-6 bg-text/50"></span>
				</a>
				<a
					class="animate-btn my-auto ml-auto flex size-10 translate-x-1/2 cursor-pointer rounded-full border-2 border-border bg-fg shadow-border transition-all hover:shadow-[0_0_4px]"
					title="mail"
					href="mailto:wql-louis@outlook.com"
				>
					<span class="m-auto icon-[tabler--mail] size-6 bg-text/50"></span>
				</a>
			</div>
		</div>
	</section>
	<span class="mx-12 mb-4 text-xs text-text/50">This website is built by hands with love &lt;3</span
	>
</main>
