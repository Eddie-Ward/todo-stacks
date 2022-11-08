/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"t-light-blue": "#8ECAE6",
				"t-med-blue": "#219EBC",
				"t-dark-blue": "#023047",
				"t-light-orange": "#FFB703",
				"t-dark-orange": "#FB8500",
			},
		},
	},
	plugins: [],
};
