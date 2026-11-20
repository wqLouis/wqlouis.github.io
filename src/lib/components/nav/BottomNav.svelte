<script lang="ts">
	import NavBar from './NavBar.svelte';
	import NavRoulette from './NavRoulette.svelte';
	import NavSheet from './NavSheet.svelte';

	/* the sheet is the plain way in — it opens from a tap on the wheel */
	let sheetOpen = $state(false);
</script>

<!--
	The navigation has two faces and one plain way in.

	Landscape (wider than tall) gets the pill bar. Portrait (taller than
	wide) gets the round button in the corner, and resting on it opens the
	wheel. Either way the navigation never drifts with the scroll.
-->
<NavBar />
<NavRoulette onopen={() => (sheetOpen = true)} />
<NavSheet open={sheetOpen} onclose={() => (sheetOpen = false)} />
