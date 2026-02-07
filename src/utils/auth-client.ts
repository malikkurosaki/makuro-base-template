import { createAuthClient } from "better-auth/react";
import { VITE_PUBLIC_URL } from "./env";

export const authClient = createAuthClient({
	baseURL: VITE_PUBLIC_URL,
});

export const { useSession, signIn, signOut, signUp, getSession } = authClient;
