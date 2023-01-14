<script>
	import '../app.css';
	import HelpIcon from '../lib/icons/HelpIcon.svelte';
	import BackIcon from '../lib/icons/BackIcon.svelte';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	let about;
	// onMount(() => {
	// 	about = window.location.href.includes('about');
	// });
	afterNavigate(() => {
		about = window.location.href.includes('about');
	});
</script>

<div class="bg-slate-800">
	<nav
		class="absolute top-0 flex w-screen items-center justify-between bg-slate-800 py-2 px-4 sm:px-6"
	>
		<span class="font-mono text-3xl font-bold text-rose-600">
			<a href="/">tminus</a>
		</span>
		<div>
			{#if about}
				<a href="/">
					<BackIcon className="text-white hover:text-rose-600 transition" />
				</a>
			{:else}
				<a href="/about">
					<HelpIcon className="text-white hover:text-rose-600 transition" />
				</a>
			{/if}
		</div>
	</nav>
	<div class="flex h-screen items-center justify-center p-4">
		<slot />
	</div>
	<footer class="absolute bottom-0 flex w-screen items-center bg-slate-800 py-2 px-4 sm:px-6">
		<span class="text-xs text-white">
			Made by
			<a
				class="font-bold underline transition-all hover:text-rose-600"
				href="https://github.com/defyentropy"
				target="_blank"
				rel="noreferrer noopener"
			>
				@defyentropy
			</a>
		</span>
	</footer>
</div>
