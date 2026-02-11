import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
	component: AdminSettingsComponent,
});

function AdminSettingsComponent() {
	return <div>Hello from /admin/settings!</div>;
}
