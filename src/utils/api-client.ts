import { edenTreaty } from "@elysiajs/eden";
import type { ApiApp } from "../index";
import { VITE_PUBLIC_URL } from "./env";

const baseUrl =
	VITE_PUBLIC_URL ||
	(typeof window !== "undefined"
		? window.location.origin
		: "http://localhost:3000");

export const apiClient = edenTreaty<ApiApp>(baseUrl);
