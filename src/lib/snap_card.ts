import { onMount } from 'svelte';

export function snap_card(card: HTMLDivElement) {
	// Config
	const NEAR_DISTANCE = 200; // px from card center → start snapping
	const SNAP_STRENGTH = 0.08; // 0.1 = soft, 0.3 = strong
	const MAX_OFFSET = 100; // max px the card can move

	let raf: number = 0;
	let targetX = 0,
		targetY = 0;
	let currentX = 0,
		currentY = 0;

	const update = () => {
		// Spring toward target
		currentX += (targetX - currentX) * SNAP_STRENGTH;
		currentY += (targetY - currentY) * SNAP_STRENGTH;

		// Apply transform
		card.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;

		raf = requestAnimationFrame(update);
	};

	const handleMouseMove = (e: MouseEvent) => {
		const rect = card.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		const dx = e.clientX - centerX;
		const dy = e.clientY - centerY;
		const distance = Math.hypot(dx, dy);

		if (distance < NEAR_DISTANCE) {
			// Only snap when nearby
			const strength = 1 - distance / NEAR_DISTANCE; // 1 = at center, 0 = at edge
			targetX = dx * strength * (MAX_OFFSET / NEAR_DISTANCE);
			targetY = dy * strength * (MAX_OFFSET / NEAR_DISTANCE);
		} else {
			// Too far → snap back to center
			targetX = 0;
			targetY = 0;
		}
	};

	// Start
	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove);
		raf = requestAnimationFrame(update);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(raf);
		};
	});
}
