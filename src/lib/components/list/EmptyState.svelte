<script lang="ts">
	let { text = '' }: { text?: string } = $props();
</script>

<div class="relative mt-12 overflow-hidden py-20 md:mt-16">
	<!-- the diagonal stripes: a page that is still under construction -->
	<div
		class="pointer-events-none absolute inset-0 opacity-25"
		style="background-image: repeating-linear-gradient(
			45deg,
			transparent 0 14px,
			var(--accent-clay) 14px 15px
		);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
		mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);"
	></div>

	<div class="relative flex justify-center px-6">
		<p
			class="-rotate-1 text-center text-3xl font-bold tracking-tight text-[var(--accent-clay)] md:text-4xl"
		>
			{text}
		</p>
	</div>
</div>
