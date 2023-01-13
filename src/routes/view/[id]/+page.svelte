<script>
	export let data;

	import { parseURL } from '$lib/url';
	import { onMount } from 'svelte';
	import ShareIcon from '$lib/icons/ShareIcon.svelte';
	import ClipboardIcon from '$lib/icons/ClipboardIcon.svelte';
	import LabelledNumber from '../../../lib/components/LabelledNumber.svelte';

	const MS_IN_MINUTE = 60000;
	const MS_IN_HOUR = 60 * MS_IN_MINUTE;
	const MS_IN_DAY = 24 * MS_IN_HOUR;

	let date;
	let status = 'PROCESSING';
	let errorMessage;
	let difference;
	let days;
	let hours;
	let minutes;
	let seconds;
	let copied = false;

	onMount(() => {
		try {
			date = parseURL(data.post.id);
		} catch (err) {
			status = 'ERROR';
			errorMessage = err;
			return;
		}

		let now = new Date();
		difference = date - now;

		if (difference < 0) {
			status = 'COMPLETED';
			return;
		}

		// days
		days = Math.floor(difference / MS_IN_DAY);
		difference %= MS_IN_DAY;
		// hours
		hours = Math.floor(difference / MS_IN_HOUR);
		difference %= MS_IN_HOUR;
		// minutes
		minutes = Math.floor(difference / MS_IN_MINUTE);
		difference %= MS_IN_MINUTE;
		// seconds
		seconds = Math.round(difference / 1000);

		status = 'COUNTING';

		let intervalID = setInterval(() => {
			if (seconds > 0) {
				seconds -= 1;
			} else {
				seconds = 59;

				if (minutes > 0) {
					minutes -= 1;
				} else {
					minutes = 59;

					if (hours > 0) {
						hours -= 1;
					} else {
						hours = 23;

						if (days > 0) {
							days -= 1;
						} else {
							status = 'COMPLETED';
							clearInterval(intervalID);
						}
					}
				}
			}
		}, 1000);
	});

	const copyLinkToClipboard = async () => {
		await navigator.clipboard.writeText('localhost:5173/view/' + data.post.id);
		copied = true;
	};
</script>

<svelte:head>
	<title>Countdown • tminus</title>
</svelte:head>

<div class="max-w-lg p-2">
	{#if status == 'PROCESSING'}
		<div class="aspect-square w-16 animate-ping rounded-full bg-rose-600" />
	{:else if status == 'ERROR'}
		<p class="mb-2 text-center text-2xl text-white">Uh oh!</p>
		<p class="mb-4 text-center font-bold text-red-600">{errorMessage}</p>
		<a class="block rounded bg-rose-600 p-2 text-center transition-all hover:bg-rose-700" href="/">
			Start a new countdown.
		</a>
	{:else if status == 'COMPLETED'}
		<p class="mb-4 text-center text-8xl font-bold text-rose-600">YAYYY!</p>
		<img class="mx-auto w-60 p-4" src="/images/rickroll.gif" alt="rickroll" />
		<p class="mb-4 text-center text-sm italic text-white">Countdown complete!</p>
	{:else}
		<div class="mx-auto grid aspect-square w-72 grid-cols-2 grid-rows-2 gap-2 p-4">
			<LabelledNumber label="Days" value={days} />
			<LabelledNumber label="Hours" value={hours} />
			<LabelledNumber label="Minutes" value={minutes} />
			<LabelledNumber label="Seconds" value={seconds} />
		</div>
		<p class="pb-4 text-center text-sm font-bold text-white">to {date.toString().slice(0, 24)}</p>
		<button
			class="mx-auto flex w-28 items-center justify-center gap-2 rounded bg-rose-600 p-2 font-bold text-white transition-all hover:bg-rose-700"
			on:click={copyLinkToClipboard}
		>
			{#if copied}
				<ClipboardIcon className="text-white" />
				Copied!
			{:else}
				<ShareIcon className="text-white" />
				Share
			{/if}
		</button>
	{/if}
</div>
