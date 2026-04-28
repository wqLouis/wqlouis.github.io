<script>
	import { page } from '$app/state';
</script>

<main class="flex h-screen w-screen bg-bg">
	<div
		class="m-auto flex cursor-default flex-col gap-4 rounded-lg border border-border p-12 text-center text-lg font-light tracking-wider text-text"
	>
		<span>什麼都沒有 :(</span>
		<span class="text-sm text-text/50">{page.status} {page.error?.message}</span>
	</div>
</main>
