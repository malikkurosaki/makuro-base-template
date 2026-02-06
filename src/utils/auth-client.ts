import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_PUBLIC_URL || "http://localhost:3000",
});

export const { useSession, signIn, signOut, signUp, getSession } = authClient;
