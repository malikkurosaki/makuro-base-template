import { describe, expect, it } from "vitest";
import { getEnv } from "../src/utils/env";

describe("Feature Utilities", () => {
	describe("getEnv Utility", () => {
		it("should return default value if env is not found", () => {
			const val = getEnv("NON_EXISTENT_KEY", "fallback");
			expect(val).toBe("fallback");
		});

		it("should return value from process.env if available", () => {
			// Mock process.env
			const originalEnv = process.env;
			process.env = { ...originalEnv, TEST_ENV_KEY: "test-value" };

			const val = getEnv("TEST_ENV_KEY");
			expect(val).toBe("test-value");

			process.env = originalEnv;
		});
	});
});
