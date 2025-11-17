import { onMount } from 'svelte';

export function cursorHover(el: HTMLElement, cursor: HTMLElement) {
	const mouseHandlerE = () => {
		cursor.classList.toggle('scale-200');
	};
	const mouseHandlerL = () => {
		cursor.classList.toggle('scale-200');
	};

	onMount(() => {
		el.addEventListener('mouseenter', mouseHandlerE);
		el.addEventListener('mouseleave', mouseHandlerL);

		return () => {
			el.removeEventListener('mouseenter', mouseHandlerE);
			el.removeEventListener('mouseleave', mouseHandlerL);
		};
	});
}
