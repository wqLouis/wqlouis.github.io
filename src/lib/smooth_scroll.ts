import { onMount } from 'svelte';

export function smooth_scroll() {
	let current_idx = 0;

	onMount(() => {
		const sections = Array.from(document.querySelectorAll('section'));

		const handle_wheel = (event: WheelEvent) => {
			event.preventDefault();

			if (event.deltaY > 0 && current_idx < sections.length - 1) {
				current_idx++;
			}
			if (event.deltaY < 0 && current_idx > 0) {
				current_idx--;
			}

			sections[current_idx].scrollIntoView({ behavior: 'smooth' });
		};

		window.addEventListener('wheel', handle_wheel, { passive: false });
	});
}
