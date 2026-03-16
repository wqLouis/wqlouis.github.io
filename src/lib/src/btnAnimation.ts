import { onMount } from 'svelte';

export function BtnAnimation() {
	onMount(() => {
		const btns = Array.from(document.getElementsByClassName('animate-btn')).map((i) => {
			return i as HTMLElement;
		});

		const mouseEnterHandler = (event: MouseEvent) => {
			const btn = event.currentTarget as HTMLElement;
			btn.style.scale = '1.1';
		};

		const mouseLeaveHandler = (event: MouseEvent) => {
			const btn = event.currentTarget as HTMLElement;
			btn.style.scale = '1';
		};

		const mouseClickHandler = (event: MouseEvent) => {
			const btn = event.currentTarget as HTMLElement;
			btn.style.scale = '0.8';
			const transitionendHandler = () => {
				btn.removeEventListener('transitionend', transitionendHandler);
				btn.style.scale = '1';
			};
			btn.addEventListener('transitionend', transitionendHandler);
		};

		btns.forEach((btn) => {
			btn.addEventListener('mouseenter', mouseEnterHandler);
			btn.addEventListener('mouseleave', mouseLeaveHandler);
			btn.addEventListener('click', mouseClickHandler);

			return () => {
				btns.forEach((btn) => {
					btn.removeEventListener('mouseenter', mouseEnterHandler);
					btn.removeEventListener('mouseleave', mouseLeaveHandler);
					btn.removeEventListener('click', mouseClickHandler);
				});
			};
		});
	});
}
