<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { BtnAnimation } from '$lib/src/btnAnimation';
	import './blog.css';

	// Initialize BtnAnimation
	BtnAnimation();

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

				try {
					// Primary method: Clipboard API
					await navigator.clipboard.writeText(codeText);
					showCopySuccess(copyButton);
				} catch (err) {
					console.error('Failed to copy with Clipboard API:', err);

					// Fallback method: Use a temporary textarea
					try {
						const textArea = document.createElement('textarea');
						textArea.value = codeText;
						textArea.style.position = 'fixed';
						textArea.style.left = '-9999px';
						textArea.style.top = '-9999px';
						document.body.appendChild(textArea);
						textArea.select();

						// Use document.execCommand as fallback (deprecated but still works in older browsers)
						const success = document.execCommand('copy');
						document.body.removeChild(textArea);

						if (success) {
							showCopySuccess(copyButton);
						} else {
							throw new Error('Fallback copy failed');
						}
					} catch (fallbackErr) {
						console.error('Fallback failed:', fallbackErr);
						// Show error state
						copyButton.classList.add('copy-error');
						copyButton.title = 'Copy failed!';
						copyButton.innerHTML = `
							<span class="icon-[heroicons--exclamation-triangle-20-solid] size-5 text-red-500"></span>
						`;

						// Reset after 2 seconds
						setTimeout(() => {
							copyButton.classList.remove('copy-error');
							copyButton.title = 'Copy to clipboard';
							copyButton.innerHTML = `
								<span class="icon-[heroicons--square-2-stack-16-solid] size-5"></span>
							`;
						}, 2000);
					}
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

	// Helper function to show copy success state
	function showCopySuccess(button: HTMLElement) {
		button.classList.add('copied');
		button.title = 'Copied!';
		button.innerHTML = `
			<span class="icon-[heroicons--check-20-solid] size-5"></span>
		`;

		// Reset after 2 seconds
		setTimeout(() => {
			button.classList.remove('copied');
			button.title = 'Copy to clipboard';
			button.innerHTML = `
				<span class="icon-[heroicons--square-2-stack-16-solid] size-5"></span>
			`;
		}, 2000);
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
