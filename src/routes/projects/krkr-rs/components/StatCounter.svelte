<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let { value = 0, suffix = '', label = '' } = $props();

	const tween = new Tween(0, { duration: 1600, easing: cubicOut });

	let node: HTMLElement | undefined = $state();

	$effect(() => {
		if (!node) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					tween.set(value);
					observer.disconnect();
				}
			},
			{ threshold: 0.4 }
		);
		observer.observe(node);
		return () => observer.disconnect();
	});
</script>

<div bind:this={node} class="flex flex-col gap-2">
	<span
		class="text-4xl leading-none font-medium tracking-[-0.03em] text-text tabular-nums md:text-5xl"
	>
		{Math.round(tween.current)}{suffix}
	</span>
	<span class="text-[10px] font-light tracking-[0.22em] text-text/45 uppercase">{label}</span>
</div>
