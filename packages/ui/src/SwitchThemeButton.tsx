import { useState } from "react";
import { useThemeSetting, useRootTheme } from "@tamagui/next-theme";
import { SunMoon, Moon } from "@tamagui/lucide-icons";
import { Button, useIsomorphicLayoutEffect } from "tamagui";

export const SwitchThemeButton = () => {
	const themeSetting = useThemeSetting();
	const [theme] = useRootTheme();

	const [clientTheme, setClientTheme] = useState<string | undefined>("light");

	useIsomorphicLayoutEffect(() => {
		setClientTheme(themeSetting.forcedTheme || themeSetting.current || theme);
	}, [themeSetting.current, themeSetting.resolvedTheme]);

	return (
		<Button themeInverse onPress={themeSetting.toggle}>
			{theme === "light" ? <SunMoon size={"$1"} /> : <Moon size={"$1"} />}

			{clientTheme}
		</Button>
	);
};
