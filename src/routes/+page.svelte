<script lang="ts">
	const icons = Object.entries(import.meta.glob('$lib/assets/langs/*.svg', { eager: true })).map(
		(entry) => {
			return entry[0];
		}
	);
</script>

<main class="h-auto w-full bg-bg [&>section]:px-8">
	<section class="mx-auto flex h-screen w-full">
		<div class="mx-auto mt-[42vh] mb-auto flex cursor-default">
			<div class="my-auto">
				<span class="text-2xl">Hi, I am wqLouis</span> <br />
				<span class="text-xl">I write bugs ;)</span>
			</div>
			<div class="mx-2 h-auto w-0.5 bg-fg"></div>
			<div class="size-24 overflow-clip rounded-full shadow-[0_0_4px] shadow-black/40">
				<img src="https://avatars.githubusercontent.com/u/114333810?v=4" alt="" />
			</div>
		</div>
	</section>
	<section class="flex h-screen flex-col pt-8">
		<div class="mx-auto text-4xl font-bold">Tech Stacks</div>
		<div class="mx-auto grid w-auto grid-cols-3 grid-rows-3 place-items-center">
			{#each icons as icon, i (i)}
				<img
					src={icon}
					alt=""
					class="m-1 size-24 rounded-2xl border-2 border-fg bg-bg transition-all hover:scale-110"
				/>
			{/each}
		</div>
	</section>
</main>
