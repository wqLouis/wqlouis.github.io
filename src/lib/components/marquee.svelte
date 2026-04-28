<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { time = '70s', children } = $props();

	let track: HTMLElement;
	let animationId: number | undefined;
	let isPaused = false;

	function parseTime(t: string): number {
		const match = t.match(/^(\d+(?:\.\d+)?)(s|ms)$/);
		if (!match) return 70000;
		const val = parseFloat(match[1]);
		return match[2] === 'ms' ? val : val * 1000;
	}

	onMount(() => {
		const duration = parseTime(time);
		if (!track) return;

		const content = track.children[0] as HTMLElement;
		if (!content) return;

		const clone = content.cloneNode(true) as HTMLElement;
		track.appendChild(clone);

		requestAnimationFrame(() => {
			const copyWidth = content.offsetWidth;
			if (copyWidth === 0) return;

			const speed = copyWidth / duration;
			let position = 0;
			let lastTime = performance.now();

			function animate(now: number) {
				if (!isPaused) {
					const delta = now - lastTime;
					position -= speed * delta;
					if (position <= -copyWidth) position += copyWidth;
					track.style.transform = `translateX(${position}px)`;
				}
				lastTime = now;
				animationId = requestAnimationFrame(animate);
			}

			animationId = requestAnimationFrame(animate);
		});
	});

	onDestroy(() => {
		if (animationId !== undefined) cancelAnimationFrame(animationId);
	});
</script>

<div
	role="presentation"
	class="relative mx-auto w-full overflow-hidden"
	onmouseenter={() => (isPaused = true)}
	onmouseleave={() => (isPaused = false)}
>
	<div
		class="pointer-events-none absolute inset-0 z-1 bg-linear-to-r from-bg via-transparent to-bg"
	></div>
	<div class="flex flex-row items-center gap-2" bind:this={track} style="will-change: transform">
		<div class="flex shrink-0 flex-row items-center gap-2">
			{@render children()}
		</div>
	</div>
</div>
