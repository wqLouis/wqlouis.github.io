<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { copyToClipboard, showCopySuccess, showCopyError } from '$lib/utils/clipboard';
	import './blog.css';

	// Track if we're in browser (hydration complete)
	let isBrowser = false;

	// Function to add copy buttons to code blocks
	function addCopyButtons() {
		// Only run in browser after hydration
		if (!isBrowser || typeof document === 'undefined') return;

		const codeBlocks = document.querySelectorAll('.blog-content pre');

		codeBlocks.forEach((preElement) => {
			// Skip if already has copy button
			if (preElement.querySelector('.copy-button')) return;

			const codeElement = preElement.querySelector('code');
			if (!codeElement) return;

			// Create copy button
			const copyButton = document.createElement('button');
			copyButton.className = 'copy-button animate-btn';
			copyButton.title = 'Copy to clipboard';
			copyButton.setAttribute('aria-label', 'Copy code to clipboard');
			copyButton.innerHTML = `
				<span class="icon-[heroicons--square-2-stack-16-solid] size-5"></span>
			`;

			// Add click handler
			copyButton.addEventListener('click', async () => {
				const codeText = codeElement.textContent || '';
				const success = await copyToClipboard(codeText);

				if (success) {
					showCopySuccess(copyButton);
				} else {
					showCopyError(copyButton);
				}
			});

			// Add button to pre element
			preElement.appendChild(copyButton);

			// Extract language from class for data attribute
			const languageClass = Array.from(preElement.classList).find((cls) =>
				cls.startsWith('language-')
			);

			if (languageClass) {
				preElement.setAttribute('data-language', languageClass.replace('language-', ''));
			}
		});
	}

	onMount(() => {
		// Mark as browser environment
		isBrowser = true;

		// Only run in browser
		if (typeof window === 'undefined' || typeof document === 'undefined') return;

		// Wait for next tick to ensure hydration is complete
		setTimeout(() => {
			addCopyButtons();
		}, 0);

		// Also add copy buttons when content updates
		const observer = new MutationObserver(() => {
			addCopyButtons();
		});

		const contentElement = document.querySelector('.blog-content');
		if (contentElement) {
			observer.observe(contentElement, { childList: true, subtree: true });
		}

		return () => observer.disconnect();
	});

	// Re-run after updates
	afterUpdate(() => {
		if (isBrowser) {
			setTimeout(addCopyButtons, 0);
		}
	});
</script>

<div class="blog-content">
	<slot />
</div>
