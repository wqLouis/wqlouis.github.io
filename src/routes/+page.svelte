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
</script>

<main class="flex h-auto w-full flex-col overflow-clip bg-bg text-text">
	<section class="mx-auto flex h-screen w-full flex-col" id="home">
		<div class="mx-auto mt-[42vh] mb-auto flex cursor-default">
			<div class="mx-4 my-auto">
				<span class="text-3xl font-light tracking-wider">Hi, I am wqLouis</span> <br />
				<span class="text-sm font-light tracking-wide text-border">I write bugs ;)</span>
			</div>
			<div class="size-22 overflow-clip rounded-full border border-border">
				<img src="https://avatars.githubusercontent.com/u/114333810?v=4" alt="" class="size-full object-cover" />
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
		<div class="flex max-w-[70vw] flex-col">
			<div class="flex w-max gap-8">
				<div class="my-8 mr-auto ml-8 text-2xl font-light tracking-wider">Tech Stacks</div>
				<button
					class="mx-auto my-auto flex h-8 w-26 cursor-pointer items-center rounded-sm border border-border transition-all hover:border-text active:border-2 active:border-text"
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
					<div class="my-auto mr-auto ml-2 text-xs font-light tracking-wider text-text/50">See More</div>
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
						<div class="mx-auto mt-8 mb-4 text-xl font-light tracking-wider">Languages</div>
						<div class="mx-auto grid w-auto grid-cols-3 place-items-center gap-6">
							{#each languageIcons as icon (icon.src)}
								<img src={icon.src} alt="" class="size-12 object-contain grayscale-0 {icon.className || ''}" />
							{/each}
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-xl font-light tracking-wider">Frontend</div>
						<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
							{#each frontendIcons as icon (icon.src)}
								<img src={icon.src} alt="" class="size-12 object-contain grayscale-0 {icon.className || ''}" />
							{/each}
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-xl font-light tracking-wider">Backend</div>
						<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
							{#each backendIcons as icon (icon.src)}
								<img src={icon.src} alt="" class="size-12 object-contain grayscale-0 {icon.className || ''}" />
							{/each}
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-xl font-light tracking-wider">Dev Ops</div>
						<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
							{#each devopsIcons as icon (icon.src)}
								<img src={icon.src} alt="" class="size-12 object-contain grayscale-0 {icon.className || ''}" />
							{/each}
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="mx-auto mt-8 mb-4 text-xl font-light tracking-wider">Game Dev</div>
					<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
						{#each gameDevIcons as icon (icon.src)}
							<img src={icon.src} alt="" class="size-12 object-contain grayscale-0 {icon.className || ''}" />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col" id="edu">
		<div class="mr-auto ml-8 text-2xl font-light tracking-wider">Education</div>
		<div class="mx-16 mt-8 flex">
			<div class="h-full w-8">
				<div class="mx-auto my-1 h-4 w-px bg-border"></div>
				<div class="mx-auto size-2 rounded-full border border-border"></div>
				<div class="mx-auto my-1 h-4 w-px bg-border"></div>
			</div>
			<div class="my-auto flex text-sm font-light tracking-wide">
				<div class="hidden size-16 items-center justify-center rounded-full border border-border sm:flex">
					<img src={Cityu} alt="" class="m-auto h-6" />
				</div>
				<div class="mx-2 my-auto">
					<div class="">CityUHK (2025~)</div>
					<div class="text-xs text-text/60">Bachelor's student in Electrical Engineering</div>
				</div>
			</div>
		</div>
	</section>

	<section id="projects" class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col">
		<div class="mb-8 ml-8 text-2xl font-light tracking-wider">Projects</div>
		<div class="mx-auto mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			<ProjectCard
				link="https://github.com/wqLouis/linux-wallpaperengine"
				cardTitle="linux wallpaper engine"
				image={Yawe}
				tags={['Rust', 'WGPU', 'Vulkan']}
			/>
			<ProjectCard
				link="https://github.com/wqLouis/NeoTV"
				cardTitle="NeoTV"
				tags={['Svelte', 'Mobile', 'Tauri']}
			/>
			<ProjectCard
				link="https://github.com/wqLouis/depkg"
				cardTitle="depkg"
				image={Depkg}
				tags={['Rust']}
			/>
			<ProjectCard
				link="https://github.com/wqLouis/wqlouis.github.io"
				cardTitle="wqlouis.github.io"
				image={PersonalWebsite}
				tags={['Svelte', 'TypeScript', 'Tailwind CSS']}
			/>
			<ProjectCard
				link="https://github.com/wqLouis/bilinovel_cli"
				cardTitle="bilinovel cli"
				tags={['Python', 'Playwright']}
			/>
			<ProjectCard
				link="https://github.com/wqLouis/paper_check"
				cardTitle="paper check"
				tags={['Python', 'Flet']}
			/>
			<ProjectCard
				link="https://github.com/wqLouis/tree-rs"
				cardTitle="tree-rs"
				image={TreeRs}
				tags={['Rust']}
			/>
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
				github/wqLouis
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
		>This website is built by hands with love</span
	>
</main>
