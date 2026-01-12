<script lang="ts">
	import Langs from '$lib/components/main/langs.svelte';
	import Frontend from '$lib/components/main/frontend.svelte';
	import Backend from '$lib/components/main/backend.svelte';
	import Devops from '$lib/components/main/devops.svelte';
</script>

<main class="h-auto w-full bg-bg text-text [&>section]:px-8">
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
			class="mx-auto mb-4 flex size-8 animate-bounce cursor-pointer rounded-full border-2 border-border bg-fg shadow-[0_0_4px] shadow-border/50 transition-all hover:scale-110"
			onclick={() => {
				document.getElementById('tech-stacks')?.scrollIntoView({ behavior: 'smooth' });
			}}
			title="To next section"
		>
			<span class="m-auto icon-[heroicons--arrow-down-16-solid] bg-text"></span>
		</button>
	</section>
	<section class="flex h-auto flex-col pt-8">
		<div class="mx-auto text-4xl font-bold" id="tech-stacks">Tech Stacks</div>
		<div class="mx-auto grid w-[80vw] grid-cols-1 sm:grid-cols-2 lg:w-[55vw]">
			<div class="flex flex-col">
				<div class="mx-auto mt-12 mb-4 text-2xl font-bold">Languages</div>
				<div class="mx-auto grid w-auto grid-cols-3 place-items-center gap-6">
					<Langs></Langs>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="mx-auto mt-12 mb-4 text-2xl font-bold">Frontend</div>
				<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
					<Frontend></Frontend>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="mx-auto mt-12 mb-4 text-2xl font-bold">Backend</div>
				<div class="mx-auto grid w-auto grid-cols-1 place-items-center gap-6">
					<Backend></Backend>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="mx-auto mt-12 mb-4 text-2xl font-bold">Dev Ops</div>
				<div class="mx-auto grid w-auto grid-cols-2 place-items-center gap-6">
					<Devops></Devops>
				</div>
			</div>
		</div>
		<div class="mx-auto mt-12 mb-4 text-2xl font-bold">Other random stuff</div>
	</section>
</main>
