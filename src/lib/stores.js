import { writable } from 'svelte/store';
import { useWritable } from './use-shared-store';
import { defaultSong } from './data/defaultData';

export const tiles = () => useWritable('tiles', {});
export const filteredWorks = () => useWritable('filteredWorks', []);
export const recentTracks = () => useWritable('recentTracks', defaultSong);
export const batteryLevel = () => useWritable('batteryLevel', 0);
export const isOnline = () =>
	useWritable('isOnline', {
		status: null,
		last_ping: null
	});
export const isWorkBeingFiltered = () => useWritable('filterMode', false);
