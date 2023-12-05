/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				'libre-caslon': ['LibreCaslonCondensed', 'sans-serif'],
				fira: ['Fira Code Variable', 'monospace'],
				'open-sans': [
					'"Open Sans Variable", sans-serif',
					{
						fontVariationSettings: '"wdth" 20'
					}
				],
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
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	daisyui: {
		themes: ['cmyk'],
		darkTheme: 'dark',
		base: true,
		styled: true,
		utils: true,
		prefix: '',
		themeRoot: ':root'
	}
};
