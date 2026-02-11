import { defineConfig, devices } from "@playwright/test";

// Get base URL from environment, default to localhost:3000
const BASE_URL = process.env.VITE_PUBLIC_URL || "http://localhost:3000";

export default defineConfig({
	testDir: "./__tests__/e2e",
	fullyParallel: false,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 1,
	reporter: "html",
	use: {
		baseURL: BASE_URL,
		trace: "on-first-retry",
		headless: true,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
		command: "NODE_ENV=production bun src/index.ts",
		url: BASE_URL,
		reuseExistingServer: !process.env.CI,
		stdout: "ignore",
		stderr: "pipe",
		timeout: 60 * 1000,
	},
});
