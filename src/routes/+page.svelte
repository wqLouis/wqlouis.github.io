<script lang="ts">
	import Langs from '$lib/components/main/langs.svelte';
	import Frontend from '$lib/components/main/frontend.svelte';
	import Backend from '$lib/components/main/backend.svelte';
	import Devops from '$lib/components/main/devops.svelte';
	import Gamedev from '$lib/components/main/gamedev.svelte';
	import Marquee from '$lib/components/marquee.svelte';

	import { BtnAnimation } from '$lib/src/btnAnimation';
	BtnAnimation();
</script>

<main class="h-auto w-full bg-bg text-text">
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
	<section class="flex h-auto min-h-screen flex-col">
		<div class="mx-auto my-8 text-4xl font-bold" id="tech-stacks">Tech Stacks</div>
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
		<button
			class="animate-btn mx-auto my-8 flex h-8 w-24 cursor-pointer rounded-full border-2 border-border bg-fg transition-all hover:shadow-[0_0_8px] hover:shadow-border"
			onclick={(event) => {
				const btn = event.currentTarget;
				const table = document.getElementById('tech-stacks-table');
				const toggle = (classArr: string[]) => {
					classArr.forEach((i) => {
						table?.classList.toggle(i);
					});

					const icon = Array.from(btn.children).filter((x) => x instanceof HTMLSpanElement)[0];
					icon.classList.toggle('rotate-180');
				};
				toggle(['h-0', 'h-300', 'opacity-0', 'sm:h-200']);
				const animationHandler = () => {
					btn.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
		<div
			class="animate-btn mx-auto size-8 cursor-pointer rounded-full border-2 border-border bg-fg transition-all hover:border-green-500 hover:bg-green-400"
		></div>
	</section>
</main>
