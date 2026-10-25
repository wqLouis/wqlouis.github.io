<script lang="ts">
	import * as m from '$paraglide/messages.js';
	import { reveal } from '$lib/utils/reveal';

	const aurCommands = [
		m.linuxwallpaperengine_aur_commands_0(),
		m.linuxwallpaperengine_aur_commands_1()
	];
	const sourceCommands = [
		m.linuxwallpaperengine_source_commands_0(),
		m.linuxwallpaperengine_source_commands_1(),
		m.linuxwallpaperengine_source_commands_2()
	];
</script>

<section id="installation" class="px-6 py-20 md:px-10 md:py-28">
	<div class="mx-auto w-full max-w-6xl">
		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between" use:reveal>
			<div>
				<span class="text-[11px] font-light tracking-[0.28em] text-[var(--accent-clay)] uppercase">
					{m.linuxwallpaperengine_hero_title()}
				</span>
				<h2 class="mt-3 text-2xl font-light tracking-wider text-text md:text-3xl">
					{m.linuxwallpaperengine_installation_title()}
				</h2>
			</div>
			<div class="h-px flex-1 bg-border/60 md:mb-3"></div>
		</div>

		<!-- ── AUR ──────────────────────────────────────────────────── -->
		<div class="mt-12 md:mt-16" use:reveal={{ delay: 100 }}>
			<h3 class="text-base font-light tracking-wider text-text">
				{m.linuxwallpaperengine_aur_title()}
			</h3>
			<div class="mt-4 h-px w-full bg-border/60"></div>

			<div class="mt-6">
				<div class="overflow-hidden rounded-lg border border-border bg-fg">
					<div class="flex items-center justify-between border-b border-border/40 px-5 py-3">
						<span class="text-[10px] font-light tracking-[0.22em] text-text/40 uppercase">
							{m.linuxwallpaperengine_aur_title()}
						</span>
						<span class="size-1.5 rounded-full bg-[var(--accent-sand)]"></span>
					</div>
					<pre
						class="overflow-x-auto bg-[var(--accent-pine)] px-5 py-4 font-mono text-xs leading-relaxed text-[#f7f2e8]">{aurCommands.join(
							'\n'
						)}</pre>
				</div>
			</div>

			<p class="mt-4 text-xs leading-relaxed font-light tracking-wide text-text/60">
				{m.linuxwallpaperengine_aur_hint()}
				<code
					class="rounded-sm border border-border/40 px-1.5 py-0.5 font-mono text-[11px] text-text/70"
				>
					{m.linuxwallpaperengine_aur_package()}
				</code>
			</p>
		</div>

		<!-- ── build from source ────────────────────────────────────── -->
		<div class="mt-12 md:mt-16" use:reveal={{ delay: 160 }}>
			<h3 class="text-base font-light tracking-wider text-text">
				{m.linuxwallpaperengine_source_title()}
			</h3>
			<div class="mt-4 h-px w-full bg-border/60"></div>

			<p class="mt-6 text-xs leading-relaxed font-light tracking-wide text-text/60">
				{m.linuxwallpaperengine_source_dependencies()}
			</p>

			<div class="mt-4">
				<div class="overflow-hidden rounded-lg border border-border bg-fg">
					<div class="flex items-center justify-between border-b border-border/40 px-5 py-3">
						<span class="text-[10px] font-light tracking-[0.22em] text-text/40 uppercase">
							{m.linuxwallpaperengine_source_title()}
						</span>
						<span class="size-1.5 rounded-full bg-[var(--accent-sand)]"></span>
					</div>
					<pre
						class="overflow-x-auto bg-[var(--accent-pine)] px-5 py-4 font-mono text-xs leading-relaxed text-[#f7f2e8]">{sourceCommands.join(
							'\n'
						)}</pre>
				</div>
			</div>
		</div>

		<!-- ── the .pkg notice ──────────────────────────────────────── -->
		<div class="mt-12 md:mt-16" use:reveal={{ delay: 220 }}>
			<div class="rounded-lg border border-border bg-fg/60 px-5 py-4">
				<p class="text-xs leading-relaxed font-light tracking-wide text-text/60">
					{m.linuxwallpaperengine_pkg_hint()}
					<code
						class="rounded-sm border border-border/40 px-1.5 py-0.5 font-mono text-[11px] text-text/70"
						>{m.linuxwallpaperengine_pkg_extension()}</code
					>
					{m.linuxwallpaperengine_pkg_hint_suffix()}
				</p>
			</div>
		</div>
	</div>
</section>
