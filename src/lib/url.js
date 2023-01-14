const padZeros = (num, length) => {
	// returns a string represenation of `num` with enough zeros prepended
	// so the string is `length` characters long
	let strNum = num.toString();
	let numZeros = length - strNum.length;

	if (numZeros > 0) {
		return '0' * numZeros + strNum;
	} else {
		return strNum;
	}
};

export const encodeURL = (month, date, hour, minute) => {
	// returns a hexadecimal string for use in route params that encodes the
	// UTC date and time of an event
	let now = new Date();
	let thisYear = now.getFullYear();
	month -= 1;

	// if the date and time entered has already occurred this year, then
	// count down to the next year
	let LocaleTarget = new Date(thisYear, month, date, hour, minute);

	if (LocaleTarget - now < 0) {
		LocaleTarget.setFullYear(thisYear + 1);
	}

	let UTCYear = LocaleTarget.getUTCFullYear();
	let UTCMonth = padZeros(LocaleTarget.getUTCMonth() + 1, 2);
	let UTCDate = padZeros(LocaleTarget.getUTCDate(), 2);
	let UTCHours = padZeros(LocaleTarget.getUTCHours(), 2);
	let UTCMinutes = padZeros(LocaleTarget.getUTCMinutes(), 2);

	let dec = parseInt(`${UTCYear}${UTCMonth}${UTCDate}${UTCHours}${UTCMinutes}`, 10);

	return dec.toString(16);
};

export const parseURL = (hex) => {
	// take a route param and extract the year, month, date, hour and minutes
	// encoded in it
	let dec;

	try {
		dec = parseInt(hex, 16).toString(10);

		// if a full date is not encoded, the url must be invalid
		// now of course, the date can also be sometime in the future or past
		// if they take the time to encode a hex string themselves
		// but honestly if someone want to mess with this so much, that's on them
		// there's not even a server involved lol idc
		if (dec.length != 12) {
			throw new Error();
		}
	} catch {
		throw new Error('Invalid URL.');
	}

	let year = dec.slice(0, 4);
	let month = dec.slice(4, 6);
	let date = dec.slice(6, 8);
	let hours = dec.slice(8, 10);
	let minutes = dec.slice(10, 12);

	let target = new Date(`${year}-${month}-${date}T${hours}:${minutes}:00Z`);

	return target;
};
