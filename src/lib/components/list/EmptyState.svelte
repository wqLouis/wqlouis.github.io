<script lang="ts">
</script>

<div class="relative my-12 overflow-hidden py-20">
	<!-- the diagonal stripes: a page that is still under construction -->
	<div
		class="krkr-stripes pointer-events-none absolute inset-0 opacity-25"
		style="background-image: repeating-linear-gradient(
			45deg,
			transparent 0 14px,
			var(--accent-clay) 14px 15px
		);
		-webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
		mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);"
	></div>
</div>

<style>
	/* the stripes wipe in from the left and slide one step as they arrive */
	.krkr-stripes {
		animation: krkr-stripes-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
	}

	@keyframes krkr-stripes-in {
		from {
			clip-path: inset(0 100% 0 0);
			background-position: 0 0;
		}
		to {
			clip-path: inset(0 0 0 0);
			background-position: 28px 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.krkr-stripes {
			animation: none;
		}
	}
</style>
