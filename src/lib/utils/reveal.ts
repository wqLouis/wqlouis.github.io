export interface RevealOptions {
	/** delay in milliseconds before the element starts revealing */
	delay?: number;
	/** how much of the element has to be visible before it reveals */
	threshold?: number;
}

/**
 * Scroll reveal helper: adds the `.reveal` class to the node and flips it to
 * `.reveal-visible` as soon as it enters the viewport. The animation itself
 * lives in `app.css` so it can be shared across components.
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, threshold = 0.12 } = options;

	node.classList.add('reveal');
	node.style.setProperty('--reveal-delay', `${delay}ms`);

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('reveal-visible');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('reveal-visible');
					observer.disconnect();
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
