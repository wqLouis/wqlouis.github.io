/**
 * Copy text to clipboard with fallback support.
 * Returns true if successful, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	// Primary method: Clipboard API
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		console.error('Failed to copy with Clipboard API:', err);

		// Fallback method: Use a temporary textarea
		try {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			textArea.style.position = 'fixed';
			textArea.style.left = '-9999px';
			textArea.style.top = '-9999px';
			document.body.appendChild(textArea);
			textArea.select();

			// Use document.execCommand as fallback (deprecated but still works in older browsers)
			const success = document.execCommand('copy');
			document.body.removeChild(textArea);
			return success;
		} catch (fallbackErr) {
			console.error('Unexpected error during fallback copy:', fallbackErr);
			return false;
		}
	}
}

/**
 * Update button to show copy success state.
 * Returns a function to reset the button after delay.
 */
export function showCopySuccess(button: HTMLElement, delay = 2000): () => void {
	const originalHTML = button.innerHTML;
	const originalTitle = button.title;

	button.classList.add('copied');
	button.title = 'Copied!';
	button.innerHTML = `
		<span class="icon-[heroicons--check-20-solid] size-5"></span>
	`;

	const timeoutId = setTimeout(() => {
		button.classList.remove('copied');
		button.title = originalTitle;
		button.innerHTML = originalHTML;
	}, delay);

	return () => clearTimeout(timeoutId);
}

/**
 * Update button to show copy error state.
 * Returns a function to reset the button after delay.
 */
export function showCopyError(button: HTMLElement, delay = 2000): () => void {
	const originalHTML = button.innerHTML;
	const originalTitle = button.title;

	button.classList.add('copy-error');
	button.title = 'Copy failed!';
	button.innerHTML = `
		<span class="icon-[heroicons--exclamation-triangle-20-solid] size-5 text-red-500"></span>
	`;

	const timeoutId = setTimeout(() => {
		button.classList.remove('copy-error');
		button.title = originalTitle;
		button.innerHTML = originalHTML;
	}, delay);

	return () => clearTimeout(timeoutId);
}
