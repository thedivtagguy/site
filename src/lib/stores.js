import { writable } from 'svelte/store';

export const works = writable([]);
export const bylines = writable([]);
export const blogposts = writable([]);
export const tidytuesday = writable([]);
export const tiles = writable({});
export const filteredWorks = writable([]);
export const recentTracks = writable({});
export const batteryLevel = writable(0);
