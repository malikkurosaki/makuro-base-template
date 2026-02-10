/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation */
import { protectedRouteMiddleware } from "@/middleware/authMiddleware";
import { authStore } from "@/store/auth";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import {
	Button,
	Container,
	Group,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { IconHome, IconQuestionMark } from "@tabler/icons-react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: RootComponent,
	beforeLoad: protectedRouteMiddleware,
	onEnter({ context }) {
		authStore.user = context?.user as any;
		authStore.session = context?.session as any;
	},
	notFoundComponent: NotFoundComponent,
});

function RootComponent() {
	return <Outlet />;
}

function NotFoundComponent() {
	return (
		<Container size="md" py={100}>
			<Stack align="center" gap="xl">
				<div
					style={{
						fontSize: "120px",
						fontWeight: 900,
						lineHeight: 1,
						color: "var(--mantine-color-orange-filled)",
						opacity: 0.2,
						position: "absolute",
						zIndex: -1,
					}}
				>
					404
				</div>
				<IconQuestionMark
					size={100}
					stroke={1.5}
					color="var(--mantine-color-orange-6)"
				/>
				<Title order={1} ta="center" style={{ fontSize: "34px" }}>
					Halaman Tidak Ditemukan
				</Title>
				<Text c="dimmed" size="lg" ta="center" maw={500}>
					Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
					Pastikan URL yang Anda masukkan sudah benar.
				</Text>
				<Group justify="center">
					<Button
						component={Link}
						to="/"
						size="md"
						variant="light"
						color="orange"
						leftSection={<IconHome size={20} />}
					>
						Kembali ke Beranda
					</Button>
				</Group>
			</Stack>
		</Container>
	);
}
