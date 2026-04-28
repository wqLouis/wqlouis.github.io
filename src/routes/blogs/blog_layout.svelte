<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import BlogContent from '$lib/components/blog/BlogContent.svelte';
	import { formatBlogDate } from '$lib/utils/date';

	export let title = 'Untitled Blog Post';
	export let date = '';
	export let author = 'wqlouis';
	export let description = '';
	export let tags: string[] = [];

	let _activeSection = '';
	let sections: { id: string; title: string }[] = [];
	let headerHeight = 100;
	let scrollProgress = 0;
	function calculateProgressHeight(sectionCount: number, progress: number): number {
		if (sectionCount === 0) return 0;
		if (sectionCount === 1) return progress * 100;
		const maxScrollForFullBar = (sectionCount - 1) / sectionCount;
		return progress <= maxScrollForFullBar
			? ((progress * sectionCount) / (sectionCount - 1)) * 100
			: 100;
	}

	$: progressHeight = calculateProgressHeight(sections.length, scrollProgress);

	function extractSections() {
		const contentElement = document.querySelector('.blog-content');
		if (!contentElement) return;

		const h1Elements = contentElement.querySelectorAll('h1');
		sections = Array.from(h1Elements).map((h1, index) => {
			if (!h1.id) {
				h1.id = `section-${index}`;
			}
			return {
				id: h1.id,
				title: h1.textContent || `Section ${index + 1}`
			};
		});
	}

	function updateActiveSection() {
		if (typeof window === 'undefined' || sections.length === 0) return;

		const scrollPosition = window.scrollY + headerHeight;

		for (let i = sections.length - 1; i >= 0; i--) {
			const section = document.getElementById(sections[i].id);
			if (section && section.offsetTop <= scrollPosition) {
				_activeSection = sections[i].id;

				const currentSection = section;
				const nextSection =
					i < sections.length - 1 ? document.getElementById(sections[i + 1].id) : null;

				const sectionStart = currentSection.offsetTop;
				let sectionEnd;

				if (nextSection) {
					sectionEnd = nextSection.offsetTop;
				} else {
					const totalHeight = document.documentElement.scrollHeight;
					const viewportHeight = window.innerHeight;
					sectionEnd = totalHeight - viewportHeight + headerHeight;
				}

				const sectionHeight = sectionEnd - sectionStart;

				if (sectionHeight > 0) {
					const progressInSection = Math.min(
						Math.max((scrollPosition - sectionStart) / sectionHeight, 0),
						1
					);
					scrollProgress = Math.min((i + progressInSection) / sections.length, 1);
				} else {
					scrollProgress = Math.min((i + 1) / sections.length, 1);
				}
				return;
			}
		}

		if (sections.length > 0) {
			_activeSection = sections[0].id;
			scrollProgress = 0;
		}
	}

	function scrollToSection(sectionId: string) {
		if (typeof window === 'undefined') return;

		const element = document.getElementById(sectionId);
		if (element) {
			const elementPosition = element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
			_activeSection = sectionId;
		}
	}

	function handleScroll() {
		if (typeof window === 'undefined') return;
		updateActiveSection();
	}

	onMount(() => {
		if (typeof window === 'undefined') return;

		let timeoutId: NodeJS.Timeout;
		timeoutId = setTimeout(() => {
			const headerEl = document.querySelector('header');
			if (headerEl) {
				headerHeight = headerEl.offsetHeight;
			}
			extractSections();
			updateActiveSection();

			window.addEventListener('scroll', handleScroll);
			handleScroll();
		}, 100);

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<section class="min-h-screen bg-bg text-text">
	<header class="sticky top-0 z-30 border-b border-border bg-bg">
		<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-4">
				<button
					title="Return to blog list"
					class="flex size-10 cursor-pointer items-center justify-center rounded-md border border-border transition-all hover:border-text active:border-2 active:border-text"
					onclick={() => {
						goto(resolve('/blogs'));
					}}
				>
					<span
						class="icon-[heroicons--arrow-left-20-solid] size-5 text-text/70"
					></span>
				</button>

				<div class="flex-1">
					<h1 class="text-2xl font-light tracking-wider text-text">{title}</h1>
					<div class="flex flex-wrap items-center gap-4 text-xs font-light tracking-wide text-text/60">
						<div class="flex items-center gap-1">
							<span class="icon-[heroicons--calendar-20-solid] size-4"></span>
							<span>{formatBlogDate(date)}</span>
						</div>
						<div class="flex items-center gap-1">
							<span class="icon-[heroicons--user-20-solid] size-4"></span>
							<span>{author}</span>
						</div>
						{#if tags && tags.length > 0}
							<div class="flex items-center gap-1">
								<span class="icon-[heroicons--tag-20-solid] size-4"></span>
								<div class="flex flex-wrap gap-1">
									{#each tags as tag (tag)}
										<span class="rounded-full border border-border px-2 py-0.5 text-[11px] font-light tracking-wider text-text/50">{tag}</span>
									{/each}
								</div>
							</div>
						{/if}
					</div>
					{#if description}
						<p class="mt-2 text-sm font-light leading-relaxed tracking-wide text-text/70">{description}</p>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<div
		class="fixed top-1/2 right-4 z-40 -translate-y-1/2 opacity-100 transition-opacity duration-300"
	>
		<div
			class="flex flex-col items-center gap-1 rounded-lg border border-border bg-fg/90 p-2"
		>
			<div class="relative h-64 w-min">
				<div class="absolute left-1/2 h-full w-px -translate-x-1/2 bg-text/10"></div>

				{#if sections.length > 0}
					<div
						class="absolute top-0 left-1/2 w-px -translate-x-1/2 bg-text/30 transition-all duration-75 ease-out"
						style="height: {progressHeight}%"
					></div>
				{/if}

				{#each sections as section, i (section.id)}
					<button
						onclick={() => scrollToSection(section.id)}
						class="group absolute right-0 left-0 flex h-8 items-center"
						style="top: {sections.length === 1
							? 50
							: (i / Math.max(sections.length - 1, 1)) * 100}%"
					>
						<div
							class="absolute top-1/2 right-4 z-10 h-8 min-h-max w-max min-w-max -translate-y-full text-xs font-light tracking-wide text-text transition-all hover:cursor-pointer {section.id ===
							_activeSection
								? 'opacity-100'
								: 'opacity-70'}"
						>
							<div
								class="size-full rounded-md border border-border bg-fg/90 px-3 py-1.5 whitespace-nowrap"
							>
								{section.title}
							</div>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<BlogContent>
			<slot />
		</BlogContent>
	</div>

	<footer class="mt-[25vh] border-t border-border py-8">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
				<div class="text-center md:text-left">
					<p class="text-xs font-light tracking-wide text-text/50">
						© {new Date().getFullYear()} Wqlouis's blog. All rights reserved.
					</p>
					<p class="mt-1 text-[11px] font-light tracking-wide text-text/40">
						Built with SvelteKit & Tailwind CSS
					</p>
				</div>

				<div class="flex items-center gap-4">
					<a
						href={resolve('/')}
						class="text-xs text-text/50 transition-all hover:text-text"
						title="Home"
					>
						Home
					</a>
					<a
						href={resolve('/blogs')}
						class="text-xs text-text/50 transition-all hover:text-text"
						title="All Blogs"
					>
						Blogs
					</a>
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs text-text/50 transition-all hover:text-text"
						title="GitHub"
					>
						GitHub
					</a>
				</div>
			</div>

			<div class="mt-6 text-center">
				<p class="text-[11px] font-light tracking-wide text-text/40">
					Last updated: {new Date().toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			</div>
		</div>
	</footer>
</section>
