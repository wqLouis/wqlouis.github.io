import { onMount } from 'svelte';

export function Card3dAnimation() {
	onMount(() => {
		const cards = Array.from(document.getElementsByClassName('animate-3d-card')).map((card) => {
			const cardHTML = card as HTMLElement;
			if (card.parentElement) {
				card.parentElement.style.perspective = '1000px';
			}
			cardHTML.style.transformStyle = 'preserve-3d';

			return cardHTML;
		});

		const mouseMoveHandler = (e: MouseEvent) => {
			const card = e.currentTarget as HTMLElement;
			const rect = card.getBoundingClientRect();
			const x = (e.x - rect.left - rect.width / 2) / (rect.width / 2);
			const y = (e.y - rect.top - rect.height / 2) / (rect.height / 2);

			card.style.transform = `rotate3d(${y},${x},0, 15deg)`;
		};

		cards.forEach((val) => {
			val.addEventListener('mousemove', mouseMoveHandler);
		});
	});
}
