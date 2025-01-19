import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Appends strings of classes. If non-truthy values are passed, they are ignored.
 * Uses tailwind-merge to merge tailwind classes.
 *
 * @param {ClassValue[]} inputs - An array of class values.
 * @returns {string} The merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(...inputs));
}

/**
 * Converts a string to a URL-friendly slug format.
 *
 * @param {string} str - The string to be slugified.
 * @param {boolean} [trim=false] - Whether to trim the slug to a certain number of words.
 * @param {number} [n=2] - The number of words to include in the slug if trimming.
 * @returns {string} The slugified string.
 */
export function slugify(str: string, trim: boolean = false, n: number = 2): string {
	let slug = String(str)
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-');

	if (trim) {
		slug = slug.split('-').slice(0, n).join('-');
	}

	return slug;
}

/**
 * Formats a date into a human-readable string.
 *
 * @param {string | number | Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: string | number | Date): string => {
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	};
	return new Date(date).toLocaleDateString('en-US', options);
};

export function getWeekNumber(date: Date) {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	// Get to the nearest Sunday
	const day = d.getDay();
	d.setDate(d.getDate() - day);

	// Get first day of year
	const yearStart = new Date(d.getFullYear(), 0, 1);
	// Adjust year start to previous Sunday if needed
	const yearStartDay = yearStart.getDay();
	yearStart.setDate(yearStart.getDate() - yearStartDay);

	const weekNum = Math.ceil((d.getTime() - yearStart.getTime()) / (7 * 86400000));
	return `${d.getFullYear()}-${weekNum.toString().padStart(2, '0')}`;
}

export function getWeekDates(weekSlug: string) {
	const [year, weekPart] = weekSlug.split('-');
	const week = parseInt(weekPart);

	// Get first day of year
	const yearStart = new Date(parseInt(year), 0, 1);
	// Adjust to previous Sunday
	const yearStartDay = yearStart.getDay();
	yearStart.setDate(yearStart.getDate() - yearStartDay);

	// Get to the start of the requested week
	const startOfWeek = new Date(yearStart);
	startOfWeek.setDate(yearStart.getDate() + (week - 1) * 7);

	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);

	return { startOfWeek, endOfWeek };
}
