<script lang="ts">
	export let title = '';
	export let discription = '';
</script>

<div class="mr-auto ml-4 h-32 w-screen max-w-2xl rounded-2xl px-5 py-3 sm:ml-12 md:w-[60vw]">
	<div class="flex flex-col">
		<span class="text-2xl font-bold text-text">{title}</span>
		<span class="text-sm font-semibold text-text/70">{discription}</span>
	</div>
</div>
