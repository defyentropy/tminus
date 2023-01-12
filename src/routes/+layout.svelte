<script>
	import '../app.css';
	import HelpIcon from '../lib/HelpIcon.svelte';
</script>

<div class="bg-slate-800">
	<nav class="fixed flex w-screen items-center justify-between py-2 px-4">
		<span class="font-mono text-3xl font-bold text-rose-600">
			<a href="/">tminus</a>
		</span>
		<div>
			<a href="/about">
				<HelpIcon className="text-white hover:text-rose-600 transition" />
			</a>
		</div>
	</nav>
	<div class="flex h-screen items-center justify-center p-4">
		<slot />
	</div>
</div>
