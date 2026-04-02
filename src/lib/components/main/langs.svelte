<script lang="ts">
	import c from '$lib/assets/langs/c.svg';
	import cpp from '$lib/assets/langs/cpp.svg';
	import csharp from '$lib/assets/langs/csharp.svg';
	import rust from '$lib/assets/langs/rust.svg';
	import python from '$lib/assets/langs/python.svg';
	import js from '$lib/assets/langs/javascript.svg';
	import ts from '$lib/assets/langs/typescript.svg';

	export let className: string = '';

	const langs = [
		{ src: c, isRust: false },
		{ src: cpp, isRust: false },
		{ src: csharp, isRust: false },
		{ src: rust, isRust: true },
		{ src: python, isRust: false },
		{ src: js, isRust: false },
		{ src: ts, isRust: false }
	];
</script>

{#each langs as item, i (i)}
	<img src={item.src} class="size-16 {className} {item.isRust ? 'icon-rust' : ''}" alt="" />
{/each}
