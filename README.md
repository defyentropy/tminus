# About [tminus](https://tminus-ecru.vercel.app)

I made this app so I could have a countdown timer to share with friends for important events, because opening the Clock app and keeping it open is a pretty big hassle.

A few things to note:

- The app automatically considers the next occurrence of the date you enter, i.e. the one within
  the next 365 days. I mean, it's unlikely that you would want to countdown to something more
  than a year away.

- The app works irrespective of what time zone the user is in. For example, you could make a
  timer for 15 minutes in the future and send it to someone across the world and they would
  still see 15 minutes on the clock.

This is something I put together pretty quickly, so there might yet be bugs. If you find one, I
would love to know. Please file an issue on the GitHub repo!

# Documentation

## /src/lib

Contains components, icons and utility functions.

## /routes/about

Contains code for the `about` page.

## /routes/view/[id]

Contains code for the count down page. `id` is a route param that encodes the time a timer is counting down to.

## /routes

Contains code for the main page, i.e. the form to create a new timer.

## /static

Contains images like the favicon.
