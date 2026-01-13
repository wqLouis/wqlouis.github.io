import { onMount } from 'svelte';

export function BtnAnimation() {
	onMount(() => {
		const btns = Array.from(document.getElementsByClassName('animate-btn')).map((i) => {
			return i as HTMLElement;
		});

		btns.forEach((btn) => {
			btn.addEventListener('mouseenter', (event) => {
				const btn = event.currentTarget as HTMLElement;
				btn.style.scale = '1.1';
			});
			btn.addEventListener('mouseleave', (event) => {
				const btn = event.currentTarget as HTMLElement;
				btn.style.scale = '1';
			});
			btn.addEventListener('click', (event) => {
				const btn = event.currentTarget as HTMLElement;
				btn.style.scale = '0.8';
				const transitionendHandler = () => {
					btn.removeEventListener('transitionend', transitionendHandler);
					btn.style.scale = '1';
				};
				btn.addEventListener('transitionend', transitionendHandler);
			});
		});
	});
}
