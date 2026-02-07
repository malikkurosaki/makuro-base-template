/**
 * Safely access environment variables across different runtimes and builders.
 * Supports Vite's import.meta.env and Bun's process.env (used in bun build).
 */
export const getEnv = (key: string, defaultValue = ""): string => {
	// 1. Try Vite's import.meta.env
	try {
		if (typeof import.meta.env !== "undefined" && import.meta.env[key]) {
			return import.meta.env[key];
		}
	} catch {}

	// 2. Try process.env (injected by bun build --env)
	try {
		if (typeof process !== "undefined" && process.env[key]) {
			return process.env[key];
		}
	} catch {}

	return defaultValue;
};

export const VITE_PUBLIC_URL = getEnv("VITE_PUBLIC_URL", "http://localhost:3000");

export const IS_DEV = (() => {
	try {
		return typeof import.meta.env !== "undefined" && import.meta.env.DEV;
	} catch {
		return false;
	}
})();
