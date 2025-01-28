import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				noto: ["Noto Sans Thai", "sans-serif"],
			},

			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				'bg-dark': '#212121',
				primary: '#5C8374', // สีหลัก
				secondary: '#A3B9AC', // สีรอง (โทนอ่อนลงจากสีหลัก)
				background: '#F5F5F5', // พื้นหลัง (soft white)
				surface: '#FFFFFF', // พื้นผิว (ขาวนวล)
				blackSoft: '#1A1A1A', // สีดำ soft
				whiteSoft: '#E5E5E5', // สีขาว soft
				onBackground: '#1A1A1A', // ข้อความบนพื้นหลัง
				onSurface: '#333333', // ข้อความบนพื้นผิว
				onPrimary: '#FFFFFF', // ข้อความบนสีหลัก
				onSecondary: '#FFFFFF', // ข้อความบนสีรอง

			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
