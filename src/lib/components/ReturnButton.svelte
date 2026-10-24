<script lang="ts">
	import { resolve } from '$app/paths';

	let {
		href = resolve('/'),
		label = 'Return',
		text = 'return',
		class: className = ''
	}: {
		/** where the button points to */
		href?: string;
		/** accessible label / tooltip */
		label?: string;
		/** the word that slides out on hover */
		text?: string;
		/** extra classes for positioning */
		class?: string;
	} = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	{href}
	title={label}
	aria-label={label}
	class="group flex h-9 max-w-9 items-center overflow-hidden rounded-full border border-transparent bg-text text-bg transition-all duration-300 ease-out hover:max-w-28 hover:border-text hover:bg-bg hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text {className}"
>
	<span class="flex size-9 shrink-0 items-center justify-center">
		<span class="icon-[heroicons--arrow-left-20-solid] size-4"></span>
	</span>
	<span
		class="pr-4 text-[11px] font-light tracking-[0.18em] whitespace-nowrap text-text opacity-0 transition-opacity delay-100 duration-200 group-hover:opacity-100"
	>
		{text}
	</span>
</a>
