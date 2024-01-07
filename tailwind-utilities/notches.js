import plugin from 'tailwindcss/plugin';

module.exports = {
	plugins: [
		plugin(function ({ addUtilities }) {
			const newUtilities = {
				'.notch': {
					position: 'relative'
				},
				'.notch::before, .notch::after': {
					position: 'absolute',
					content: '""',
					borderRight: '20px solid transparent',
					borderLeft: '20px solid transparent',
					width: '0',
					height: '0',
					left: '50%',
					transform: 'translateX(-50%)'
				},
				'.notch::before': {
					borderTop: '30px solid currentColor',
					bottom: '100%'
				},
				'.notch::after': {
					borderBottom: '30px solid currentColor',
					top: '100%'
				}
			};

			addUtilities(newUtilities, ['responsive']);
		})
	]
};
