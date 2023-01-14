<script>
	import ClockIcon from '../lib/icons/ClockIcon.svelte';
	import { goto } from '$app/navigation';
	import { encodeURL } from '$lib/url';
	import FormInput from '../lib/components/FormInput.svelte';

	let month;
	let day;
	let hour;
	let minute;
	let processing = false;
	let errorMessage = '';

	// calculate number of days in each month
	let date = new Date();

	let thisYear = date.getFullYear();
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

		if (!(month && day && hour != undefined && minute != undefined)) {
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
		if (hour < 0 || hour > 23) {
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
		await goto(`/view/${encodeURL(month, day, hour, minute)}`);
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

<div class="max-w-lg p-2">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="mx-auto grid aspect-square w-72 grid-cols-2 grid-rows-2 gap-2 p-4">
			<!-- Month -->
			<FormInput label="Month" bind:value={month} />
			<!-- Day -->
			<FormInput label="Date" bind:value={day} />
			<!-- Hour -->
			<FormInput label="Hour" bind:value={hour} />
			<!-- Minute -->
			<FormInput label="Minutes" bind:value={minute} />
		</div>
		{#if errorMessage}
			<p class="mb-4 h-4 text-center text-sm font-bold text-red-600">{errorMessage}</p>
		{:else}
			<p class="mb-4 h-4 text-center text-sm text-white">Please use 24-hour time.</p>
		{/if}
		<button
			disabled={processing}
			class="mx-auto flex cursor-pointer items-center gap-2 rounded bg-rose-600 p-2 font-semibold text-white transition-all hover:bg-rose-700 focus:outline-none disabled:cursor-default disabled:bg-rose-400"
			type="submit"
		>
			<ClockIcon className=" text-white" />
			Create Timer
		</button>
	</form>
</div>
