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

export function getWeekNumber(date: Date): string {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));

	const yearStart = new Date(d.getFullYear(), 0, 4);
	const weekNum = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

	return `${d.getFullYear()}-${weekNum.toString().padStart(2, '0')}`;
}

export function getWeekDates(weekSlug: string) {
	const [year, weekPart] = weekSlug.split('-');
	const week = parseInt(weekPart);

	// Start with January 1st
	const yearStart = new Date(parseInt(year), 0, 1);

	// Get to first Monday of the year
	const firstMonday = new Date(yearStart);
	while (firstMonday.getDay() !== 1) {
		firstMonday.setDate(firstMonday.getDate() + 1);
	}

	// Get to the start of our target week
	const startOfWeek = new Date(firstMonday);
	startOfWeek.setDate(firstMonday.getDate() + (week - 1) * 7);
	startOfWeek.setHours(0, 0, 0, 0);

	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6);
	endOfWeek.setHours(23, 59, 59, 999);

	return { startOfWeek, endOfWeek };
}
