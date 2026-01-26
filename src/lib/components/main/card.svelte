<script lang="ts">
	export let content: string = '';
	export let link: string = 'https://wqlouis.github.io/';
	export let image: string = '';

	import { BtnAnimation } from '$lib/src/btnAnimation';
	import { Card3dAnimation } from '$lib/src/3dcardAnimation';

	Card3dAnimation();
	BtnAnimation();
</script>

<div
	class="animate-3d-card flex h-80 w-64 flex-col rounded-2xl border-2 border-border bg-fg p-4 text-sm font-semibold shadow-[0_4px_8px] shadow-border"
>
	<div class="mb-4 h-1/2 overflow-clip rounded-lg border-2 border-border bg-fg">
		<img src={image} class="h-full object-cover" alt="" />
	</div>
	<div class="my-auto text-center">{content}</div>
	<div class="flex">
		<a
			class="animate-btn mx-auto my-2 flex h-8 w-max cursor-pointer rounded-2xl border-2 border-border bg-fg shadow-[0_0_4px] shadow-border transition-all hover:shadow-[0_0_12px]"
			href={link}
			target="_blank"
		>
			<div class="m-auto mx-4 text-text/50">View source code</div>
		</a>
	</div>
</div>
