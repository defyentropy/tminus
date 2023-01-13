<script>
	export let label;
	export let value;
</script>

<label class="flex flex-col items-center text-sm text-slate-400 focus-within:text-rose-600">
	{label}
	<input
		type="number"
		class="aspect-square rounded border border-slate-200 bg-slate-200 p-1 text-center text-6xl text-rose-600 placeholder-transparent transition-colors placeholder-shown:border-slate-700 placeholder-shown:bg-slate-700 focus:border-rose-600 focus:outline-none"
		placeholder="0"
		bind:value
		autocomplete="off"
	/>
</label>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
