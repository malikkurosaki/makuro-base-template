import {
	ActionIcon,
	AppShell,
	Avatar,
	Box,
	Burger,
	Group,
	Menu,
	NavLink,
	rem,
	ScrollArea,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
	IconChevronRight,
	IconHome,
	IconKey,
	IconLogout,
	IconSettings,
	IconUser,
	IconUsers,
} from "@tabler/icons-react";
import {
	createFileRoute,
	Outlet,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";
import { useSnapshot } from "valtio";
import { authStore } from "../../store/auth";
import { authClient } from "@/utils/auth-client";

export const Route = createFileRoute("/dashboard")({
	component: DashboardLayout,
});

function DashboardLayout() {
	const location = useLocation();
	const navigate = useNavigate();
	const snap = useSnapshot(authStore);
	const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
	const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

	const navItems = [
		{
			icon: IconHome,
			label: "Beranda",
			to: "/dashboard",
			description: "Ringkasan sistem & statistik",
		},
		{
			icon: IconUsers,
			label: "Pengguna",
			to: "/dashboard/users",
			description: "Kelola akun & hak akses",
		},
		{
			icon: IconKey,
			label: "API Key",
			to: "/dashboard/apikey",
			description: "Manajemen kunci akses API",
		},
		{
			icon: IconSettings,
			label: "Pengaturan",
			to: "/dashboard/settings",
			description: "Konfigurasi sistem",
		},
	];

	const handleLogout = async () => {
		modals.openConfirmModal({
			title: "Konfirmasi Keluar",
			centered: true,
			children: (
				<Text size="sm">
					Apakah Anda yakin ingin keluar dari sistem? Sesi Anda akan berakhir.
				</Text>
			),
			labels: { confirm: "Keluar", cancel: "Batal" },
			confirmProps: { color: "red" },
			onConfirm: async () => {
				await authClient.signOut();
				navigate({ to: "/signin" });
			},
		});
	};

	const isActive = (path: string) => {
		const current = location.pathname;
		if (path === "/dashboard")
			return current === "/dashboard" || current === "/dashboard/";
		return current.startsWith(path);
	};

	return (
		<AppShell
			header={{ height: 70 }}
			navbar={{
				width: 280,
				breakpoint: "sm",
				collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
			}}
			padding="md"
			transitionDuration={500}
			transitionTimingFunction="ease"
		>
			<AppShell.Header
				bg="rgba(26, 26, 26, 0.8)"
				style={{
					backdropFilter: "blur(10px)",
					borderBottom: "1px solid rgba(251, 240, 223, 0.1)",
				}}
			>
				<Group h="100%" px="md" justify="space-between">
					<Group gap="xs">
						<Burger
							opened={mobileOpened}
							onClick={toggleMobile}
							hiddenFrom="sm"
							size="sm"
							color="#f3d5a3"
						/>
						<Burger
							opened={desktopOpened}
							onClick={toggleDesktop}
							visibleFrom="sm"
							size="sm"
							color="#f3d5a3"
						/>
						<Box visibleFrom="xs" ml="xs">
							<Text
								fw={800}
								size="xl"
								c="#f3d5a3"
								style={{ letterSpacing: "-0.5px" }}
							>
								ADMIN
								<Text span c="#fbf0df">
									PANEL
								</Text>
							</Text>
						</Box>
					</Group>

					<Group gap="md">
						<Menu
							shadow="md"
							width={200}
							position="bottom-end"
							transitionProps={{ transition: "pop-top-right" }}
						>
							<Menu.Target>
								<Group
									gap="xs"
									style={{ cursor: "pointer" }}
									p="xs"
									hover-bg="rgba(255,255,255,0.05)"
								>
									<div
										style={{ textAlign: "right" }}
										className="visible-from-sm"
									>
										<Text size="sm" fw={600} c="#fbf0df">
											{snap.user?.name}
										</Text>
										<Text size="xs" c="dimmed">
											Administrator
										</Text>
									</div>
									<Avatar
										src={snap.user?.image}
										radius="xl"
										size="md"
										style={{ border: "2px solid #f3d5a3" }}
									>
										{snap.user?.name?.charAt(0)}
									</Avatar>
								</Group>
							</Menu.Target>

							<Menu.Dropdown>
								<Menu.Label>Akun</Menu.Label>
								<Menu.Item
									leftSection={
										<IconUser style={{ width: rem(14), height: rem(14) }} />
									}
									onClick={() => navigate({ to: "/profile" })}
								>
									Profil Saya
								</Menu.Item>
								<Menu.Item
									leftSection={
										<IconSettings style={{ width: rem(14), height: rem(14) }} />
									}
									onClick={() => navigate({ to: "/dashboard/settings" })}
								>
									Pengaturan
								</Menu.Item>

								<Menu.Divider />

								<Menu.Label>Bahaya</Menu.Label>
								<Menu.Item
									color="red"
									leftSection={
										<IconLogout style={{ width: rem(14), height: rem(14) }} />
									}
									onClick={handleLogout}
								>
									Keluar Sistem
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>
				</Group>
			</AppShell.Header>

			<AppShell.Navbar
				p="md"
				bg="rgba(20, 20, 20, 1)"
				style={{ borderRight: "1px solid rgba(251, 240, 223, 0.1)" }}
			>
				<AppShell.Section grow component={ScrollArea} mx="-md" px="md">
					<Stack gap="xs" mt="md">
						{navItems.map((item) => (
							<Tooltip
								key={item.to}
								label={item.description}
								position="right"
								disabled={!desktopOpened}
								openDelay={500}
							>
								<NavLink
									onClick={() => {
										navigate({ to: item.to });
										if (mobileOpened) toggleMobile();
									}}
									leftSection={
										<item.icon
											style={{ width: rem(20), height: rem(20) }}
											stroke={1.5}
										/>
									}
									label={
										<Box>
											<Text size="sm" fw={isActive(item.to) ? 700 : 500}>
												{item.label}
											</Text>
										</Box>
									}
									rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
									active={isActive(item.to)}
									variant="filled"
									color="orange"
									styles={{
										root: {
											borderRadius: rem(8),
											marginBottom: rem(4),
											backgroundColor: isActive(item.to)
												? "rgba(243, 213, 163, 0.1)"
												: "transparent",
											color: isActive(item.to) ? "#f3d5a3" : "#fbf0df",
											"&:hover": {
												backgroundColor: "rgba(243, 213, 163, 0.05)",
											},
										},
										label: {
											fontSize: rem(14),
										},
									}}
								/>
							</Tooltip>
						))}
					</Stack>
				</AppShell.Section>

				<AppShell.Section
					style={{ borderTop: "1px solid rgba(251, 240, 223, 0.1)" }}
					pt="md"
				>
					<NavLink
						label="Pusat Bantuan"
						leftSection={
							<IconSettings
								style={{ width: rem(18), height: rem(18) }}
								stroke={1.5}
							/>
						}
						styles={{ root: { borderRadius: rem(8) } }}
					/>
					<NavLink
						label="Keluar"
						onClick={handleLogout}
						leftSection={
							<IconLogout
								style={{ width: rem(18), height: rem(18) }}
								stroke={1.5}
								color="red"
							/>
						}
						c="red"
						styles={{ root: { borderRadius: rem(8) } }}
					/>
				</AppShell.Section>
			</AppShell.Navbar>

			<AppShell.Main bg="rgba(15, 15, 15, 1)">
				<Box p="lg" style={{ minHeight: "calc(100vh - 100px)" }}>
					<Outlet />
				</Box>
			</AppShell.Main>
		</AppShell>
	);
}
