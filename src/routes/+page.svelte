<script lang="ts">
	import Langs from '$lib/components/main/langs.svelte';
	import Frontend from '$lib/components/main/frontend.svelte';
	import Backend from '$lib/components/main/backend.svelte';
	import Devops from '$lib/components/main/devops.svelte';
	import Gamedev from '$lib/components/main/gamedev.svelte';
	import Cityu from '$lib/assets/others/CityU_logo.svg';
	import Marquee from '$lib/components/marquee.svelte';

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
	<section class="flex h-auto min-h-max">
		<div class="w-[15vw]"></div>
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
			<Marquee
				><Langs></Langs><Frontend></Frontend><Backend></Backend><Devops></Devops><Gamedev></Gamedev>
			</Marquee>
			<div class="h-0 overflow-clip opacity-0 transition-all duration-1000" id="tech-stacks-table">
				<div class="mx-auto grid w-[80vw] grid-cols-1 sm:grid-cols-2 lg:w-[55vw]">
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Languages</div>
						<div class="mx-auto grid w-auto grid-cols-3 place-items-center gap-6">
							<Langs className="grayscale-100"></Langs>
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Frontend</div>
						<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
							<Frontend className="grayscale-100"></Frontend>
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Backend</div>
						<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
							<Backend className="grayscale-100"></Backend>
						</div>
					</div>
					<div class="flex flex-col">
						<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Dev Ops</div>
						<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
							<Devops className="grayscale-100"></Devops>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<div class="mx-auto mt-8 mb-4 text-2xl font-bold">Game Dev</div>
					<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
						<Gamedev className="grayscale-100"></Gamedev>
					</div>
				</div>
			</div>
		</div>
		<div class="w-[15vw]"></div>
	</section>
	<section class="mx-auto mt-8 flex h-max w-[70vw] flex-col" id="edu">
		<div class="mr-auto ml-8 text-2xl font-bold">Education</div>
		<div class="mx-16 my-8 flex">
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
				<div class="flex size-16 rounded-full border-2 border-border">
					<img src={Cityu} alt="" class="m-auto h-6" />
				</div>
				<div class="mx-2 my-auto">
					<div class="">CityUHK (2025~)</div>
					<div class="">Bachelor of Electrical Engineering</div>
				</div>
			</div>
		</div>
	</section>
</main>
