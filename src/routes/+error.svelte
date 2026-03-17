<script>
	import { page } from '$app/state';
</script>

<main class="flex h-screen w-screen bg-bg">
	<div
		class="m-auto flex cursor-default flex-col gap-4 rounded-2xl border-2 border-border p-12 text-center text-2xl font-bold text-text shadow-[0_0_4px] shadow-border"
	>
		<span>什麼都沒有 :(</span>
		<span>{page.status} {page.error?.message}</span>
	</div>
</main>
