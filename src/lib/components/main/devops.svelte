<script lang="ts">
	import ubuntu from '$lib/assets/devops/UbuntuCoF.svg';
	import podman from '$lib/assets/devops/Podman-logo-orig.png';
	import git from '$lib/assets/devops/git.svg';
	import github from '$lib/assets/devops/github-mark-white.svg';

	export let className: string = '';

	const icons = [ubuntu, podman, git, github];
</script>

{#each icons as icon, i (i)}
	<img src={icon} alt="" class="h-auto max-h-16 object-cover {className}" />
{/each}
