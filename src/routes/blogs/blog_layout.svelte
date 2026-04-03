<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import BlogContent from '$lib/components/blog/BlogContent.svelte';

	// Blog metadata - passed from mdsvex frontmatter
	export let title = 'Untitled Blog Post';
	export let date = '';
	export let author = 'wqlouis';
	export let description = '';
	export let tags: string[] = [];

	// State for scroll indicator
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let _activeSection = '';
	let sections: { id: string; title: string }[] = [];
	let headerHeight = 100;
	let scrollProgress = 0;
	$: progressHeight =
		sections.length > 0
			? (() => {
					const N = sections.length;
					if (N === 1) {
						// Single section: bar fills from 0% to 100% as user scrolls through it
						return scrollProgress * 100;
					}
					// Multiple sections: bar height maps scrollProgress to position between first and last title
					// When scrollProgress = 0 (top of page) => 0%
					// When scrollProgress = (N-1)/N (last section start) => 100%
					// When scrollProgress = 1 (bottom of page) => 100% (stays full)
					const maxScrollForFullBar = (N - 1) / N;
					if (scrollProgress <= maxScrollForFullBar) {
						return ((scrollProgress * N) / (N - 1)) * 100;
					} else {
						return 100;
					}
				})()
			: 0;

	// Format date for display
	function formatDate(dateString: string): string {
		if (!dateString) return 'Unknown date';
		try {
			return new Date(dateString).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return 'Unknown date';
		}
	}

	// Extract h1 sections from content
	function extractSections() {
		const contentElement = document.querySelector('.blog-content');
		if (!contentElement) return;

		const h1Elements = contentElement.querySelectorAll('h1');
		sections = Array.from(h1Elements).map((h1, index) => {
			// Generate ID if not present
			if (!h1.id) {
				h1.id = `section-${index}`;
			}
			return {
				id: h1.id,
				title: h1.textContent || `Section ${index + 1}`
			};
		});
		console.log('Extracted sections:', sections.length, sections);
		if (sections.length > 0) {
			sections.forEach((section, idx) => {
				const el = document.getElementById(section.id);
				if (el) console.log(`Section ${idx}: offsetTop=${el.offsetTop}`);
			});
		}
	}

	// Update active section and scroll progress
	function updateActiveSection() {
		// Only run in browser
		if (typeof window === 'undefined' || sections.length === 0) return;

		// Account for sticky header height (approx 100px)
		const scrollPosition = window.scrollY + headerHeight;

		// Find which section is currently in view
		for (let i = sections.length - 1; i >= 0; i--) {
			const section = document.getElementById(sections[i].id);
			if (section && section.offsetTop <= scrollPosition) {
				_activeSection = sections[i].id;

				// Calculate scroll progress within current section
				const currentSection = section;
				const nextSection =
					i < sections.length - 1 ? document.getElementById(sections[i + 1].id) : null;

				const sectionStart = currentSection.offsetTop;
				let sectionEnd;

				if (nextSection) {
					sectionEnd = nextSection.offsetTop;
				} else {
					// For the last section, use the maximum scroll position
					const totalHeight = document.documentElement.scrollHeight;
					const viewportHeight = window.innerHeight;
					// Maximum scrollPosition (window.scrollY + headerHeight) at bottom
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
					// If section has no height, we're at the section
					scrollProgress = Math.min((i + 1) / sections.length, 1);
				}
				return;
			}
		}

		// If no section found, we're at the top of the page - show first section as active
		if (sections.length > 0) {
			_activeSection = sections[0].id;
			scrollProgress = 0;
			console.log('At top of page, scrollProgress = 0');
		}
	}

	// Scroll to section
	function scrollToSection(sectionId: string) {
		// Only run in browser
		if (typeof window === 'undefined') return;

		const element = document.getElementById(sectionId);
		if (element) {
			// Account for sticky header (approx 100px)
			const elementPosition = element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - headerHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
			_activeSection = sectionId;
		}
	}

	// Handle scroll events
	function handleScroll() {
		// Only run in browser
		if (typeof window === 'undefined') return;

		updateActiveSection();
	}

	// Initialize
	onMount(() => {
		// Only run in browser
		if (typeof window === 'undefined') return;

		// Wait for content to be rendered
		let timeoutId: NodeJS.Timeout;
		timeoutId = setTimeout(() => {
			// Measure actual header height
			const headerEl = document.querySelector('header');
			if (headerEl) {
				headerHeight = headerEl.offsetHeight;
				console.log('Measured header height:', headerHeight);
			}
			extractSections();
			updateActiveSection();

			// Add scroll listener
			window.addEventListener('scroll', handleScroll);
			handleScroll(); // Initial check
		}, 100);

		// Cleanup function
		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<section class="min-h-screen bg-bg text-text">
	<!-- Blog Header -->
	<header class="sticky top-0 z-30 border-b border-border bg-bg/80 backdrop-blur-md">
		<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-4">
				<!-- Return Button -->
				<button
					title="Return to blog list"
					class="animate-btn group flex size-10 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-fg transition-all hover:scale-105 hover:bg-fg/80"
					on:click={() => {
						goto(resolve('/blogs'));
					}}
				>
					<span
						class="icon-[heroicons--arrow-left-20-solid] size-5 text-text/70 transition-transform group-hover:-translate-x-0.5"
					></span>
				</button>

				<div class="flex-1">
					<h1 class="text-3xl font-bold text-text">{title}</h1>
					<div class="flex flex-wrap items-center gap-4 text-sm text-text/70">
						<div class="flex items-center gap-1">
							<span class="icon-[heroicons--calendar-20-solid] size-4"></span>
							<span>{formatDate(date)}</span>
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
										<span class="rounded-full bg-fg px-2 py-0.5 text-xs">{tag}</span>
									{/each}
								</div>
							</div>
						{/if}
					</div>
					{#if description}
						<p class="mt-2 text-text/80">{description}</p>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<!-- Scroll Indicator (Right Side) -->
	<div
		class="fixed top-1/2 right-4 z-40 -translate-y-1/2 opacity-100 transition-opacity duration-300"
	>
		<div
			class="flex flex-col items-center gap-1 rounded-full border border-border bg-fg/90 p-2 shadow-lg backdrop-blur-sm"
		>
			<!-- Single vertical bar container -->
			<div class="relative h-64 w-min">
				<!-- Bar background (static) -->
				<div class="absolute left-1/2 h-full w-1 -translate-x-1/2 rounded-full bg-text/10"></div>

				<!-- Progress bar (fills from top) -->
				{#if sections.length > 0}
					<div
						class="absolute top-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-text/60 transition-all duration-75 ease-out"
						style="height: {progressHeight}%"
					></div>
				{/if}

				{#each sections as section, i (section.id)}
					<!-- Section titles as clickable buttons -->
					<button
						on:click={() => scrollToSection(section.id)}
						class="group absolute right-0 left-0 flex h-8 items-center"
						style="top: {sections.length === 1
							? 50
							: (i / Math.max(sections.length - 1, 1)) * 100}%"
					>
						<!-- Tooltip-styled title label -->
						<div
							class="absolute top-1/2 right-4 z-10 h-8 min-h-max w-max min-w-max -translate-y-full text-xs text-text transition-all hover:cursor-pointer {section.id ===
							_activeSection
								? 'opacity-100'
								: 'opacity-70'}"
						>
							<div
								class="size-full rounded-full border border-border bg-fg/90 px-3 py-1.5 whitespace-nowrap shadow-lg backdrop-blur-sm"
							>
								{section.title}
							</div>
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
		<BlogContent>
			<slot />
		</BlogContent>
	</div>

	<!-- Footer -->
	<footer class="mt-[25vh] border-t border-border bg-fg/50 py-8">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
				<div class="text-center md:text-left">
					<p class="text-sm text-text/70">
						© {new Date().getFullYear()} Wqlouis's blog. All rights reserved.
					</p>
					<p class="mt-1 text-xs text-text/50">
						Built with
						<span
							class="mx-1 icon-[simple-icons--svelte] inline-block size-3 align-text-bottom text-text/60"
						></span>
						SvelteKit &
						<span
							class="mx-1 icon-[simple-icons--tailwindcss] inline-block size-3 align-text-bottom text-text/60"
						></span>
						Tailwind CSS
					</p>
				</div>

				<div class="flex items-center gap-4">
					<a
						href={resolve('/')}
						class="text-sm text-text/70 transition-colors hover:text-text"
						title="Home"
					>
						<span class="icon-[heroicons--home-20-solid] size-5"></span>
					</a>
					<a
						href={resolve('/blogs')}
						class="text-sm text-text/70 transition-colors hover:text-text"
						title="All Blogs"
					>
						<span class="icon-[heroicons--document-text-20-solid] size-5"></span>
					</a>
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-text/70 transition-colors hover:text-text"
						title="GitHub"
					>
						<span class="icon-[simple-icons--github] size-5"></span>
					</a>
				</div>
			</div>

			<div class="mt-6 text-center">
				<p class="text-xs text-text/50">
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

<style>
	/* Smooth transitions */
	button,
	a {
		transition: all 0.2s ease;
	}

	/* Footer styling */
	footer {
		backdrop-filter: blur(10px);
	}
</style>
