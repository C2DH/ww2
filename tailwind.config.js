/** @type {import('tailwindcss').Config} */
export default {
  	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
		'node_modules/flowbite-react/lib/esm/**/*.js'
  	],
  	theme: {
    	extend: {
			fontFamily: {
				abril: ['Abril Fatface', 'serif'],
				antonio: ['Antonio', 'sans-serif'],
				sofia: ['Sofia Sans Extra Condensed', 'sans-serif']
			},

			backgroundColor: {
				'blue': '#6EDFFB',
				'green': '#4A5D50'
			},

			colors: {
				'blue': '#6EDFFB',
			},

			keyframes: {
				big: {
					'0%, 100%': { transform: 'scale(0.8)' },
					'50%': { transform: 'scale(1.2)' }
				},
				small: {
					'0%, 100%': { transform: 'scale(0)' },
					'50%': { transform: 'scale(1)' },
				}
			},

			animation: {
				pulseBig: 'big 1.5s ease-in-out infinite',
				pulseSmall: 'small 1.5s ease-in-out infinite',
			}
    	}
  	},
  	plugins: [
    	require('flowbite/plugin')
  	]
}