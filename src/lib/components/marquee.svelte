<script lang="ts">
	export let time: string = '70s';
</script>

<div class="marquee-container relative mx-auto w-full overflow-hidden">
	<div
		class="pointer-events-none absolute z-1 size-full bg-linear-to-r from-bg via-transparent to-bg"
	></div>
	<div
		class="marquee-content inline-flex animate-[marquee_var(--animation-time)_linear_infinite] flex-nowrap duration-1000 *:mx-8"
		style="--animation-time: {time}"
	>
		<div class="flex w-max shrink-0 flex-row items-center gap-6">
			<slot />
		</div>
		<div class="flex w-max shrink-0 flex-row items-center gap-6">
			<slot />
		</div>
	</div>
</div>

<style>
	.marquee-container:hover .marquee-content {
		animation-play-state: paused;
	}
</style>
