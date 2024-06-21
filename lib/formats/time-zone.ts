import { formatInTimeZone } from 'date-fns-tz';

export const timeZoneFormatDate = (date: Date) => {
	return new Date(
		formatInTimeZone(date, 'Asia/Jakarta', 'M.d.yyyy HH:mm:ss.SSS')
	);
};

export const timeZoneFormatString = (date: Date) => {
	return new Intl.DateTimeFormat(['ban', 'id'], {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
	}).format(new Date(date));
};

export const timeZoneFormatWithTimeString = (date: Date) => {
	return new Intl.DateTimeFormat(['ban', 'id'], {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(date));
};

export const timeZoneGetTimeString = (date: Date) => {
	return new Intl.DateTimeFormat(['ban', 'id'], {
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(date));
};

export const timeZoneWithDayName = (date: Date) => {
	return new Intl.DateTimeFormat(['ban', 'id'], {
		weekday: "long",
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(new Date(date));
};
