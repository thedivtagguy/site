/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			fontFamily: {
				'libre-caslon': ['LibreCaslonCondensed', 'serif'],
				fira: ['Fira Code Variable', 'monospace'],
				archivo: ['Archivo Variable', 'sans-serif'],
				roboto: ['Roboto Condensed', 'sans-serif']
			},
			colors: {
				yellow: '#E8C85A',
				orange: '#E8845A',
				blue: '#4D80E6',
				green: '#92DE86',
				sage: '#949B80',
				red: '#B56666',
				purple: '#4F4E8D',
				neutral: '#2B2B2B',
				'base-100': '#F8FBF8',
				'base-200': '#EDEDED',
				'base-300': '#A3A3A2'
			},
			boxShadow: {
				'btn-drop-shadow': '0 2px 0 0 #2b2b2b'
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('flowbite/plugin'),
		require('./tailwind-utilities/notches')
	]
};
