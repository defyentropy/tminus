<script>
	import ClockIcon from '../lib/ClockIcon.svelte';
	import { goto } from '$app/navigation';

	let month;
	let day;
	let hour;
	let minute;
	let processing = false;
	let errorMessage = '';

	// calculate number of days in each month
	let date = new Date();

	let thisYear = date.getYear();
	if (date.getMonth() > 1) {
		thisYear += 1;
	}

	let leapYear = false;

	if (thisYear % 100 == 0) {
		if (thisYear % 400 == 0) {
			leapYear = true;
		}
	} else {
		if (thisYear % 4 == 0) {
			leapYear = true;
		}
	}

	const daysInMonths = {
		1: 31,
		2: leapYear ? 29 : 28,
		3: 31,
		4: 30,
		5: 31,
		6: 30,
		7: 31,
		8: 31,
		9: 30,
		10: 31,
		11: 30,
		12: 31
	};

	const handleSubmit = async () => {
		processing = true;
		errorMessage = '';

		if (!(month && day && hour && minute)) {
			errorMessage = 'Please fill out all fields.';
			processing = false;
			return;
		}

		// month validation
		if (month < 1 || month > 12) {
			errorMessage = 'Month out of range.';
			processing = false;
			return;
		}

		// day validation
		if (day < 1 || day > daysInMonths[month]) {
			errorMessage = 'Day out of range.';
			processing = false;
			return;
		}

		// hour validation
		if (hour < 1 || hour > 12) {
			errorMessage = 'Hour out of range.';
			processing = false;
			return;
		}

		// minute validation
		if (minute < 0 || minute > 59) {
			errorMessage = 'Minute out of range.';
			processing = false;
			return;
		}

		// no errors
		await goto('/view/test');
		processing = false;
	};
</script>

<svelte:head>
	<title>New Timer • tminus</title>
	<meta
		name="description"
		content="Quickly make shareable timers so you and your friends can count something down together even if you aren't in the same place. No sign up required."
	/>
</svelte:head>

<div class="mx-auto my-auto max-w-lg p-2">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="mx-auto grid aspect-square w-72 grid-cols-2 grid-rows-2 gap-2 p-4">
			<!-- Month -->
			<label class="flex flex-col items-center text-sm text-slate-400 focus-within:text-rose-600">
				Month
				<input
					type="number"
					class="aspect-square rounded border border-slate-200 bg-slate-200 p-1 text-center text-6xl text-rose-600 placeholder-transparent transition-colors placeholder-shown:border-slate-700 placeholder-shown:bg-slate-700 focus:border-rose-600 focus:outline-none"
					placeholder="0"
					bind:value={month}
					autocomplete="off"
				/>
			</label>
			<!-- Day -->
			<label class="flex flex-col items-center text-sm text-slate-400 focus-within:text-rose-600">
				Day
				<input
					type="number"
					class="aspect-square rounded border border-slate-200 bg-slate-200 p-1 text-center text-6xl text-rose-600 placeholder-transparent transition-colors placeholder-shown:border-slate-700 placeholder-shown:bg-slate-700 focus:border-rose-600 focus:outline-none"
					placeholder="0"
					bind:value={day}
					autocomplete="off"
				/>
			</label>
			<!-- Hour -->
			<label class="flex flex-col items-center text-sm text-slate-400 focus-within:text-rose-600">
				Hour
				<input
					type="number"
					class="aspect-square rounded border border-slate-200 bg-slate-200 p-1 text-center text-6xl text-rose-600 placeholder-transparent transition-colors placeholder-shown:border-slate-700 placeholder-shown:bg-slate-700 focus:border-rose-600 focus:outline-none"
					placeholder="0"
					bind:value={hour}
					autocomplete="off"
				/>
			</label>
			<!-- Minute -->
			<label class="flex flex-col items-center text-sm text-slate-400 focus-within:text-rose-600">
				Minutes
				<input
					type="number"
					class="aspect-square rounded border border-slate-200 bg-slate-200 p-1 text-center text-6xl text-rose-600 placeholder-transparent transition-colors placeholder-shown:border-slate-700 placeholder-shown:bg-slate-700 focus:border-rose-600 focus:outline-none"
					placeholder="0"
					bind:value={minute}
					autocomplete="off"
				/>
			</label>
		</div>
		<p class="mb-4 h-4 text-center text-sm font-bold text-red-600">{errorMessage}</p>
		<button
			disabled={processing}
			class="mx-auto flex cursor-pointer gap-2 rounded-sm bg-rose-600 p-2 font-bold text-white transition-all hover:bg-rose-700 focus:outline-none disabled:cursor-default disabled:bg-rose-400"
			type="submit"
		>
			<ClockIcon className=" text-white" />
			Create Timer
		</button>
	</form>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
