/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"th-blue-200": "#8ECAE6",
				"th-blue-400": "#62B6DD",
				"th-blue-500": "#219EBC",
				"th-blue-900": "#023047",
				"th-orange-500": "#FFB703",
				"th-orange-700": "#FB8500",
			},
			fontFamily: {
				cursive: ["'Atma'", "'cursive'"],
			},
		},
	},
	plugins: [],
};
