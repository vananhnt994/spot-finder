import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// ...deine Farben und Einstellungen...
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-gentle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'float': 'float 6s ease-in-out infinite',
			}
		},
		keyframes: {
			float: {
				'0%, 100%': { transform: 'translateY(0px)' },
				'50%': { transform: 'translateY(-8px)' },
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;