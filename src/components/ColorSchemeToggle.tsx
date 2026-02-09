import {
	ActionIcon,
	Group,
	rem,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ColorSchemeToggle() {
	const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme("light", {
		getInitialValueInEffect: true,
	});

	return (
		<Group justify="center">
			<ActionIcon
				onClick={() =>
					setColorScheme(computedColorScheme === "light" ? "dark" : "light")
				}
				variant="default"
				size="lg"
				aria-label="Toggle color scheme"
			>
				{computedColorScheme === "light" ? (
					<IconMoon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
				) : (
					<IconSun style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
				)}
			</ActionIcon>
		</Group>
	);
}
