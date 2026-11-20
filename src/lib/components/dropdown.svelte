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

	/** the shifts are measured again on every open — the menu must sit on
	 *  the trigger, not where it was when the page loaded */
	function measure() {
		const objRect = trigger.getBoundingClientRect();
		const dropRect = dropdown.getBoundingClientRect();

		xShift = objRect.width / 2 - dropRect.width / 2;
		yShift = objRect.height / 2 - dropRect.height / 2;
	}

	const openHandler = () => {
		measure();
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
		measure();

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

<!--
	The menu is a sibling of the trigger, not a child of it: a button
	inside a button is not a button, and the browser closes the outer one
	as soon as it reads the inner one.
-->
<div class="relative my-auto inline-flex">
	<button
		type="button"
		onclick={toggle}
		bind:this={trigger}
		class="flex cursor-pointer items-center justify-center rounded-md border border-transparent transition-all {triggerClass}"
		aria-expanded={isOpen}
		aria-haspopup="true"
	>
		{@render children()}
	</button>

	<div
		bind:this={dropdown}
		class="pointer-events-none absolute z-10 flex min-w-max scale-95 flex-col rounded-md border border-border bg-fg text-text opacity-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)] blur-xs transition-all"
	>
		{@render menu()}
	</div>
</div>
