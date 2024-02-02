import { writable } from 'svelte/store';
import { useWritable } from './use-shared-store';

export const tiles = () => useWritable('tiles', {});
export const filteredWorks = () => useWritable('filteredWorks', []);
export const recentTracks = () =>
	useWritable('recentTracks', [
		{
			artist: { mbid: '', '#text': 'The Shins' },
			streamable: '0',
			image: [
				{
					size: 'small',
					'#text': 'https://lastfm.freetls.fastly.net/i/u/34s/3a0a6652a355083f49f935cc908f99ca.jpg'
				},
				{
					size: 'medium',
					'#text': 'https://lastfm.freetls.fastly.net/i/u/64s/3a0a6652a355083f49f935cc908f99ca.jpg'
				},
				{
					size: 'large',
					'#text': 'https://lastfm.freetls.fastly.net/i/u/174s/3a0a6652a355083f49f935cc908f99ca.jpg'
				},
				{
					size: 'extralarge',
					'#text':
						'https://lastfm.freetls.fastly.net/i/u/300x300/3a0a6652a355083f49f935cc908f99ca.jpg'
				}
			],
			mbid: '',
			album: { mbid: '', '#text': 'Oh, Inverted World (20th Anniversary Remaster)' },
			name: 'New Slang - 2021 Remaster',
			url: 'https://www.last.fm/music/The+Shins/_/New+Slang+-+2021+Remaster',
			date: { uts: '1706899091', '#text': '02 Feb 2024, 18:38' }
		},
		{
			artist: { mbid: 'b8a7c51f-362c-4dcb-a259-bc6e0095f0a6', '#text': 'Ed Sheeran' },
			streamable: '0',
			image: [
				{
					size: 'small',
					'#text': 'https://lastfm.freetls.fastly.net/i/u/34s/cb28e94e9867ea7388dc9b5b8eeab8f9.jpg'
				},
				{
					size: 'medium',
					'#text': 'https://lastfm.freetls.fastly.net/i/u/64s/cb28e94e9867ea7388dc9b5b8eeab8f9.jpg'
				},
				{
					size: 'large',
					'#text': 'https://lastfm.freetls.fastly.net/i/u/174s/cb28e94e9867ea7388dc9b5b8eeab8f9.jpg'
				},
				{
					size: 'extralarge',
					'#text':
						'https://lastfm.freetls.fastly.net/i/u/300x300/cb28e94e9867ea7388dc9b5b8eeab8f9.jpg'
				}
			],
			mbid: 'd24753d8-6cba-4076-990c-668111eca0ea',
			album: { mbid: '0c0676bb-5ad8-4359-8324-8aed895f6044', '#text': '=' },
			name: 'Visiting Hours',
			url: 'https://www.last.fm/music/Ed+Sheeran/_/Visiting+Hours',
			date: { uts: '1706898799', '#text': '02 Feb 2024, 18:33' }
		}
	]);
export const batteryLevel = () => useWritable('batteryLevel', 0);
export const isOnline = () =>
	useWritable('isOnline', {
		status: 'Online',
		last_ping: '2024-02-02T15:13:01.654709'
	});
