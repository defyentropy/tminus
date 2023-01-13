<svelte:head>
	<title>About • tminus</title>
</svelte:head>

<div class="flex max-w-lg flex-col gap-4 p-2 text-white">
	<p>
		I made this app so I could have a countdown timer to share with friends for important events,
		because opening the Clock app and keeping it open is a pretty big hassle.
	</p>
	<p>A few things to note:</p>
	<ul class="list-disc pl-4">
		<li>
			The app automatically considers the next occurrence of the date you enter, i.e. the one within
			the next 365 days. I mean, it's unlikely that you would want to countdown to something more
			than a year away.
		</li>
		<li>
			The app works irrespective of what time zone the user is in. For example, you could make a
			timer for 15 minutes in the future and send it to someone across the world and they would
			still see 15 minutes on the clock.
		</li>
	</ul>
	<p>
		This is something I put together pretty quickly, so there might yet be bugs. If you find one, I
		would love to know. Please file an issue on the GitHub repo!
	</p>
</div>
