<script lang="ts">
	import c from '$lib/assets/langs/c.svg';
	import cpp from '$lib/assets/langs/cpp.svg';
	import csharp from '$lib/assets/langs/csharp.svg';
	import rust from '$lib/assets/langs/rust.svg';
	import python from '$lib/assets/langs/python.svg';
	import js from '$lib/assets/langs/javascript.svg';
	import ts from '$lib/assets/langs/typescript.svg';

	const langs = [c, cpp, csharp, rust, python, js, ts];
</script>

{#each langs as icon, i (i)}
	<img src={icon} class="size-16" />
{/each}
