// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));
import withTmInitializer from "next-transpile-modules";

const withTM = withTmInitializer(["three", "@react-three/drei"]);

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.glsl$/,
			loader: "webpack-glsl-loader",
		});
		return config;
	},
};
export default withTM(config);
