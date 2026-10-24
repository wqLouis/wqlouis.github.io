<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import { reveal } from '$lib/utils/reveal';

	const steps = [
		{ label: m.krkr_build_steps_0_label(), code: m.krkr_build_steps_0_code() },
		{ label: m.krkr_build_steps_1_label(), code: m.krkr_build_steps_1_code() },
		{ label: m.krkr_build_steps_2_label(), code: m.krkr_build_steps_2_code() }
	];
</script>

<section id="build" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.krkr_build_kicker()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.krkr_build_title()}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
			<div class="md:col-span-4" use:reveal>
				<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">
					{m.krkr_build_note()}
				</p>
				<a
					href="https://github.com/wqLouis/krkr-rs/tree/master/docs"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-5 inline-flex items-center gap-2 text-[11px] font-light tracking-[0.18em] text-text/70 uppercase transition-colors hover:text-[var(--accent-clay)]"
				>
					{m.krkr_docs_title()}
					<span class="icon-[heroicons--arrow-top-right-on-square-20-solid] size-3.5"></span>
				</a>
			</div>

			<div class="flex flex-col gap-4 md:col-span-8">
				{#each steps as step, i (step.label)}
					<div
						use:reveal={{ delay: i * 100 }}
						class="overflow-hidden rounded-lg border border-border bg-fg"
					>
						<div class="flex items-center justify-between border-b border-border/40 px-5 py-3">
							<span class="text-[10px] font-light tracking-[0.22em] text-text/40 uppercase">
								{step.label}
							</span>
							<span class="size-1.5 rounded-full bg-[var(--accent-sand)]"></span>
						</div>
						<pre
							class="overflow-x-auto bg-[var(--accent-pine)] px-5 py-4 font-mono text-xs leading-relaxed text-[#f7f2e8]">{step.code}</pre>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
