import { writable } from 'svelte/store';
import { useWritable } from './use-shared-store';
import { defaultSong } from './data/defaultData';

export const tiles = () => useWritable('tiles', {});
export const filteredWorks = () => useWritable('filteredWorks', []);
export const recentTracks = () => useWritable('recentTracks', defaultSong);
export const batteryLevel = () => useWritable('batteryLevel', 0);
export const isOnline = () =>
	useWritable('isOnline', {
		status: 'Online',
		last_ping: '2024-02-02T15:13:01.654709'
	});
export const isWorkBeingFiltered = () => useWritable('filterMode', false);
