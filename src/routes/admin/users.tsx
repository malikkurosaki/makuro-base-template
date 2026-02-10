import { createFileRoute } from "@tanstack/react-router";
import { protectedRouteMiddleware } from "../../middleware/authMiddleware";

export const Route = createFileRoute("/admin/users")({
	component: AdminUsersComponent,
});

function AdminUsersComponent() {
	return <div>Hello from /admin/users!</div>;
}
