<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		popOffset?: { x: number; y: number };
		triggerClass?: string;
		children: Snippet;
		menu: Snippet;
	}

	let { popOffset = { x: 0, y: 0 }, triggerClass = '', children, menu }: Props = $props();

	let trigger: HTMLButtonElement;
	let dropdown: HTMLDivElement;

	let xShift = 0;
	let yShift = 0;

	const openHandler = () => {
		dropdown.style.left = `calc(${xShift}px + ${popOffset.x}%)`;
		dropdown.style.bottom = `calc(${yShift}px + ${popOffset.y}%)`;
		dropdown.classList.toggle('opacity-100', true);
		dropdown.classList.toggle('blur-xs', false);
		dropdown.classList.toggle('scale-100', true);
		dropdown.classList.toggle('scale-95', false);
		dropdown.style.pointerEvents = 'auto';
	};

	const closeHandler = () => {
		dropdown.style.left = `${xShift}px`;
		dropdown.style.bottom = `${yShift}px`;
		dropdown.classList.toggle('opacity-100', false);
		dropdown.classList.toggle('blur-xs', true);
		dropdown.classList.toggle('scale-100', false);
		dropdown.classList.toggle('scale-95', true);
		dropdown.style.pointerEvents = 'none';
	};

	let isOpen = $state(false);

	function toggle() {
		if (isOpen) {
			closeHandler();
			isOpen = false;
		} else {
			openHandler();
			isOpen = true;
		}
	}

	onMount(() => {
		const objRect = trigger.getBoundingClientRect();
		const dropRect = dropdown.getBoundingClientRect();

		xShift = objRect.width / 2 - dropRect.width / 2;
		yShift = objRect.height / 2 - dropRect.height / 2;

		dropdown.style.left = `${xShift}px`;
		dropdown.style.bottom = `${yShift}px`;
		dropdown.style.pointerEvents = 'none';

		const handleClickOutside = (event: MouseEvent) => {
			if (!trigger.contains(event.target as Node) && !dropdown.contains(event.target as Node)) {
				closeHandler();
				isOpen = false;
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<button
	type="button"
	onclick={toggle}
	bind:this={trigger}
	class="relative my-auto flex cursor-pointer items-center justify-center rounded-md border border-transparent transition-all {triggerClass}"
	aria-expanded={isOpen}
	aria-haspopup="true"
>
	{@render children()}

	<div
		bind:this={dropdown}
		class="pointer-events-none absolute z-10 flex min-w-max flex-col rounded-md border border-border bg-fg text-text opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all blur-xs scale-95"
	>
		{@render menu()}
	</div>
</button>