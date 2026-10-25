<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import { reveal } from '$lib/utils/reveal';

	/** the status markers ship as "[done]" / "[wip]" / "[todo]" — the brackets are dropped */
	const labels = {
		done: m.linuxwallpaperengine_roadmap_done().replace(/[[\]]/g, ''),
		wip: m.linuxwallpaperengine_roadmap_wip().replace(/[[\]]/g, ''),
		todo: m.linuxwallpaperengine_roadmap_todo().replace(/[[\]]/g, '')
	};

	const roadmap = [
		{ done: true, status: 'done' as const, text: m.linuxwallpaperengine_roadmap_items_0() },
		{ done: false, status: 'wip' as const, text: m.linuxwallpaperengine_roadmap_items_1() },
		{ done: true, status: 'done' as const, text: m.linuxwallpaperengine_roadmap_items_2() },
		{ done: false, status: 'todo' as const, text: m.linuxwallpaperengine_roadmap_items_3() },
		{ done: false, status: 'todo' as const, text: m.linuxwallpaperengine_roadmap_items_4() }
	];
	const knownIssues = [
		m.linuxwallpaperengine_known_issues_items_0(),
		m.linuxwallpaperengine_known_issues_items_1(),
		m.linuxwallpaperengine_known_issues_items_2(),
		m.linuxwallpaperengine_known_issues_items_3()
	];
	const disclaimer = [
		m.linuxwallpaperengine_disclaimer_items_0(),
		m.linuxwallpaperengine_disclaimer_items_1(),
		m.linuxwallpaperengine_disclaimer_items_2()
	];
</script>

<section id="development" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.linuxwallpaperengine_hero_title()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.linuxwallpaperengine_development_title()}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<!-- ── roadmap ──────────────────────────────────────────────── -->
		<div class="mt-12 md:mt-16" use:reveal={{ delay: 100 }}>
			<h3 class="text-base font-light tracking-wider text-text">
				{m.linuxwallpaperengine_roadmap_title()}
			</h3>
			<div class="mt-4 h-px w-full bg-border/60"></div>

			{#each roadmap as item, i (item.text)}
				<div
					use:reveal={{ delay: i * 70 }}
					class="group grid grid-cols-12 items-center gap-y-2 border-b border-border/50 py-6 transition-colors hover:bg-fg/50 md:gap-y-0 md:py-8"
				>
					<div class="col-span-3 md:col-span-2">
						<span
							class="text-[11px] font-light tracking-[0.18em] uppercase {item.status === 'wip'
								? 'text-[var(--accent-clay)]'
								: 'text-text/30'}"
						>
							{labels[item.status]}
						</span>
					</div>

					<div class="col-span-9 md:col-span-10 md:pl-6">
						<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">
							{item.text}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- ── known issues ─────────────────────────────────────────── -->
		<div class="mt-12 md:mt-16" use:reveal={{ delay: 160 }}>
			<h3 class="text-base font-light tracking-wider text-text">
				{m.linuxwallpaperengine_known_issues_title()}
			</h3>
			<div class="mt-4 h-px w-full bg-border/60"></div>

			{#each knownIssues as issue, i (issue)}
				<div
					use:reveal={{ delay: i * 70 }}
					class="group grid grid-cols-12 items-center gap-y-2 border-b border-border/50 py-6 transition-colors hover:bg-fg/50 md:gap-y-0 md:py-8"
				>
					<div class="col-span-3 md:col-span-2">
						<span
							class="text-[11px] font-light tracking-[0.18em] text-[var(--accent-clay)] uppercase"
							>[!]</span
						>
					</div>

					<div class="col-span-9 md:col-span-10 md:pl-6">
						<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">{issue}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- ── disclaimer ───────────────────────────────────────────── -->
		<div class="mt-12 md:mt-16" use:reveal={{ delay: 220 }}>
			<h3 class="text-base font-light tracking-wider text-text">
				{m.linuxwallpaperengine_disclaimer_title()}
			</h3>
			<div class="mt-4 h-px w-full bg-border/60"></div>

			{#each disclaimer as item, i (item)}
				<div
					use:reveal={{ delay: i * 70 }}
					class="group grid grid-cols-12 items-center gap-y-2 border-b border-border/50 py-6 transition-colors hover:bg-fg/50 md:gap-y-0 md:py-8"
				>
					<div class="col-span-3 md:col-span-2">
						<span class="text-[11px] font-light tracking-[0.18em] text-text/30 uppercase">[i]</span>
					</div>

					<div class="col-span-9 md:col-span-10 md:pl-6">
						<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">{item}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- ── the stack and the source ────────────────────────────── -->
		<div class="mt-12 flex flex-col items-center gap-6 md:mt-16" use:reveal={{ delay: 280 }}>
			<div class="h-px w-full bg-border/60"></div>
			<div class="flex flex-wrap justify-center gap-3">
				<a
					href="https://www.rust-lang.org/"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-light tracking-widest text-text/40 transition-all hover:border-text hover:text-text"
					>Rust</a
				>
				<a
					href="https://github.com/gfx-rs/wgpu"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-light tracking-widest text-text/40 transition-all hover:border-text hover:text-text"
					>Wgpu</a
				>
				<a
					href="https://www.vulkan.org/"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-full border border-border/60 px-2.5 py-0.5 text-[10px] font-light tracking-widest text-text/40 transition-all hover:border-text hover:text-text"
					>Vulkan</a
				>
			</div>
			<a
				href="https://github.com/wqLouis/linux-wallpaperengine"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-[11px] font-light tracking-[0.18em] text-text/70 uppercase transition-colors hover:text-[var(--accent-clay)]"
			>
				{m.linuxwallpaperengine_view_on_github()}
				<span class="icon-[heroicons--arrow-top-right-on-square-20-solid] size-3.5"></span>
			</a>
		</div>
	</div>
</section>
