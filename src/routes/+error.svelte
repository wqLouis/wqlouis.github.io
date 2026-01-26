<script>
	import { page } from '$app/stores';
</script>

<main>
	Oops... <br />
	{$page.status} <br />
	{$page.error?.message}
</main>
