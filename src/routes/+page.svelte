<script lang="ts">
	import Langs from '$lib/components/main/langs.svelte';
	import Frontend from '$lib/components/main/frontend.svelte';
	import Backend from '$lib/components/main/backend.svelte';
	import Devops from '$lib/components/main/devops.svelte';
	import Gamedev from '$lib/components/main/gamedev.svelte';
	import Cityu from '$lib/assets/others/CityU_logo.svg';
	import Marquee from '$lib/components/marquee.svelte';
	import ProjectCard from '$lib/components/main/card.svelte';
	import PersonalWebsite from '$lib/assets/others/PersonalWebsite.png';
	import TreeRs from '$lib/assets/others/treers.png';

	import { BtnAnimation } from '$lib/src/btnAnimation';
	BtnAnimation();
</script>

<main class="flex h-auto w-full flex-col bg-bg text-text">
	<section class="mx-auto flex h-screen w-full flex-col">
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
	<section class="mx-auto flex h-auto min-h-max w-[70vw] min-w-max">
		<div class="flex max-w-[70vw] flex-col">
			<div class="flex w-max gap-8">
				<div class="my-8 mr-auto ml-8 text-2xl font-bold" id="tech-stacks">Tech Stacks</div>
				<button
					class="animate-btn mx-auto my-auto flex h-8 w-24 cursor-pointer rounded-full border-2 border-border bg-fg transition-all hover:shadow-[0_0_8px] hover:shadow-border"
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
					<div class="my-auto mr-auto ml-3 text-xs font-bold text-text/50">See More</div>
					<span
						class="my-auto mr-2 ml-auto icon-[heroicons--chevron-down] size-4 bg-text/50 transition-all"
					></span>
				</button>
			</div>
			<Marquee time="70s"
				><Langs></Langs><Frontend></Frontend><Backend></Backend><Devops></Devops><Gamedev></Gamedev>
			</Marquee>
			<div class="h-0 overflow-clip opacity-0 transition-all duration-1000" id="tech-stacks-table">
				<div class="mx-auto grid w-full grid-cols-1 sm:grid-cols-2 lg:w-4/5">
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Languages</div>
						<div class="mx-auto grid w-auto grid-cols-3 place-items-center gap-6">
							<Langs className="grayscale-0"></Langs>
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Frontend</div>
						<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
							<Frontend className="grayscale-0"></Frontend>
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Backend</div>
						<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
							<Backend className="grayscale-0"></Backend>
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Dev Ops</div>
						<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
							<Devops className="grayscale-0"></Devops>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Game Dev</div>
					<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
						<Gamedev className="grayscale-0"></Gamedev>
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
				<div class="flex size-16 rounded-full border-2 border-border bg-fg">
					<img src={Cityu} alt="" class="m-auto h-6" />
				</div>
				<div class="mx-2 my-auto">
					<div class="">CityUHK (2025~)</div>
					<div class="">Bachelor of Electrical Engineering</div>
				</div>
			</div>
		</div>
	</section>
	<section id="experience" class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col">
		<div class="mb-8 ml-8 text-2xl font-bold">Experience</div>
		<div class="mx-16 flex h-max w-full flex-col">
			<div class="flex h-12">
				<div class="my-auto font-semibold">2022</div>
				<div class="flex w-8 flex-col">
					<div
						class="mx-auto mb-1 w-1 grow rounded-full bg-linear-to-t from-border to-transparent"
					></div>
					<div class="mx-auto size-3 rounded-full bg-border"></div>
					<div class="mx-auto mt-1 w-1 grow rounded-t-full bg-border"></div>
				</div>
				<div class="my-auto text-sm font-semibold">
					Formula Edge AI Racer competition<br />First Runner Up
				</div>
			</div>
			<div class="flex h-12">
				<div class="my-auto font-semibold">2023</div>
				<div class="flex w-8 flex-col">
					<div class="mx-auto mb-1 w-1 grow rounded-b-full bg-border"></div>
					<div class="mx-auto size-3 rounded-full bg-border"></div>
					<div class="mx-auto mt-1 w-1 grow rounded-t-full bg-border"></div>
				</div>
				<div class="my-auto text-sm font-semibold">
					APRA Hong Kong competition <br /> Third Runner Up
				</div>
			</div>
			<div class="flex h-12">
				<div class="my-auto font-semibold">2023</div>
				<div class="flex w-8 flex-col">
					<div class="mx-auto mb-1 w-1 grow rounded-b-full bg-border"></div>
					<div class="mx-auto size-3 rounded-full bg-border"></div>
					<div class="mx-auto mt-1 w-1 grow rounded-t-full bg-border"></div>
				</div>
				<div class="my-auto text-sm font-semibold">APRA International competition</div>
			</div>
			<div class="flex h-12">
				<div class="my-auto font-semibold">2023</div>
				<div class="flex w-8 flex-col">
					<div class="mx-auto mb-1 w-1 grow rounded-b-full bg-border"></div>
					<div class="mx-auto size-3 rounded-full bg-border"></div>
					<div
						class="mx-auto mt-1 w-1 grow rounded-full bg-linear-to-b from-border to-transparent"
					></div>
				</div>
				<div class="flex rounded-2xl text-sm font-semibold">
					<div class="my-auto">EdCity Master Code AI competition<br />Merit Award</div>
				</div>
			</div>
		</div>
	</section>
	<section id="projects" class="mx-auto mt-8 flex h-max w-max min-w-[70vw] flex-col">
		<div class="mb-8 ml-8 text-2xl font-bold">Projects</div>
		<div class="mx-auto mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			<ProjectCard
				link="https://github.com/wqLouis/paper_check"
				content="A python paddle ocr wrapper, built with flet."
			></ProjectCard>
			<ProjectCard
				link="https://github.com/wqLouis/wqlouis.github.io"
				content="My personal website built with Tailwindcss and Svelte."
				image={PersonalWebsite}
			></ProjectCard>
			<ProjectCard
				link="https://github.com/wqLouis/tree-rs"
				content="A simple cli tools written in Rust."
				image={TreeRs}
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
</main>
