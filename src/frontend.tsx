/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */
/** biome-ignore-all lint/style/noNonNullAssertion: <explanation */
/** biome-ignore-all lint/suspicious/noAssignInExpressions: <explanation */

import { createTheme, MantineProvider } from "@mantine/core";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Inspector } from "react-dev-inspector";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { ModalsProvider } from "@mantine/modals";

// Create a new router instance
export const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const theme = createTheme({
	/** Theme customization here */
});

const InspectorWrapper = import.meta.env.DEV
	? Inspector
	: ({ children }: { children: React.ReactNode }) => <>{children}</>;

const elem = document.getElementById("root")!;
const app = (
	<InspectorWrapper
		keys={["shift", "a"]}
		onClickElement={(e) => {
			if (!e.codeInfo) return;

			const url = import.meta.env.VITE_PUBLIC_URL;
			fetch(`${url}/__open-in-editor`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					relativePath: e.codeInfo.relativePath,
					lineNumber: e.codeInfo.lineNumber,
					columnNumber: e.codeInfo.columnNumber,
				}),
			});
		}}
	>
		<MantineProvider theme={theme}>
			<ModalsProvider>
				<RouterProvider router={router} />
			</ModalsProvider>
		</MantineProvider>
	</InspectorWrapper>
);

if (import.meta.hot) {
	// With hot module reloading, `import.meta.hot.data` is persisted.
	const root = (import.meta.hot.data.root ??= createRoot(elem));
	root.render(app);
} else {
	// The hot module reloading API is not available in production.
	createRoot(elem).render(app);
}
