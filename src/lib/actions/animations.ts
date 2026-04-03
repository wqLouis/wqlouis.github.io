/**
 * Button animation action for scale effects on hover and click.
 * Apply to a container element that contains buttons with class "animate-btn".
 */
export function btnAnimation(node: HTMLElement) {
	const handleMouseOver = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const btn = target.closest('.animate-btn');
		if (btn && btn instanceof HTMLElement) {
			btn.style.scale = '1.1';
		}
	};

	const handleMouseOut = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const btn = target.closest('.animate-btn');
		if (btn && btn instanceof HTMLElement) {
			btn.style.scale = '1';
		}
	};

	const handleClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const btn = target.closest('.animate-btn');
		if (btn && btn instanceof HTMLElement) {
			btn.style.scale = '0.8';
			const transitionendHandler = () => {
				btn.removeEventListener('transitionend', transitionendHandler);
				btn.style.scale = '1';
			};
			btn.addEventListener('transitionend', transitionendHandler);
		}
	};

	node.addEventListener('mouseover', handleMouseOver);
	node.addEventListener('mouseout', handleMouseOut);
	node.addEventListener('click', handleClick);

	return {
		destroy() {
			node.removeEventListener('mouseover', handleMouseOver);
			node.removeEventListener('mouseout', handleMouseOut);
			node.removeEventListener('click', handleClick);
		}
	};
}

/**
 * 3D card tilt animation action.
 * Apply to card elements with class "animate-3d-card".
 */
export function card3dAnimation(node: HTMLElement) {
	const handleMouseMove = (e: MouseEvent) => {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = (e.x - rect.left - rect.width / 2) / (rect.width / 2);
		const y = (e.y - rect.top - rect.height / 2) / (rect.height / 2);

		card.style.transform = `rotate3d(${-y},${x},0, 15deg)`;
	};

	const handleMouseLeave = (e: MouseEvent) => {
		const card = e.currentTarget as HTMLElement;
		card.style.transform = 'rotate3d(0 ,0 ,0 , 15deg)';
	};

	const cards = node.querySelectorAll('.animate-3d-card');
	cards.forEach((card) => {
		if (card instanceof HTMLElement) {
			if (card.parentElement) {
				card.parentElement.style.perspective = '1000px';
			}
			card.style.transformStyle = 'preserve-3d';
			card.addEventListener('mousemove', handleMouseMove);
			card.addEventListener('mouseleave', handleMouseLeave);
		}
	});

	return {
		destroy() {
			cards.forEach((card) => {
				if (card instanceof HTMLElement) {
					card.removeEventListener('mousemove', handleMouseMove);
					card.removeEventListener('mouseleave', handleMouseLeave);
				}
			});
		}
	};
}
