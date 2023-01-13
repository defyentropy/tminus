const padZeros = (num, length) => {
	let strNum = num.toString();
	let numZeros = length - strNum.length;

	if (numZeros > 0) {
		return '0' * numZeros + strNum;
	} else {
		return strNum;
	}
};

export const encodeURL = (month, date, hour, minute) => {
	let now = new Date();
	let thisYear = now.getFullYear();
	let thisMonth = now.getMonth();

	month -= 1;

	if (month < thisMonth || (month == thisMonth && date < now.getDate())) {
		thisYear += 1;
	}

	let LocaleTarget = new Date(thisYear, month, date, hour, minute);

	let UTCYear = LocaleTarget.getUTCFullYear();
	let UTCMonth = padZeros(LocaleTarget.getUTCMonth() + 1, 2);
	let UTCDate = padZeros(LocaleTarget.getUTCDate(), 2);
	let UTCHours = padZeros(LocaleTarget.getUTCHours(), 2);
	let UTCMinutes = padZeros(LocaleTarget.getUTCMinutes(), 2);

	let dec = parseInt(`${UTCYear}${UTCMonth}${UTCDate}${UTCHours}${UTCMinutes}`, 10);
	let hex = dec.toString(16);

	return hex;
};

export const parseURL = (hex) => {
	let dec;

	try {
		dec = parseInt(hex, 16).toString(10);

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
