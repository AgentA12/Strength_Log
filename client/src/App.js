import { Routes } from "react-router-dom";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { routes } from "./routes/routes";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const themeStyles = {
    colorScheme: colorScheme,

    focusRingStyles: {
      resetStyles: () => ({ outline: "none" }),

      PasswordInputStyles: (theme) => ({
        outline: `1px solid ${theme.colors.grape[6]}`,
        ":focus-within": `1px solid ${theme.colors.grape[6]}`,
      }),
      inputStyles: (theme) => ({
        outline: `1px solid ${theme.colors.grape[6]}`,
      }),
    },
  };

  useHotkeys([["ctrl+K", () => toggleColorScheme()]]);

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        inherit
        theme={themeStyles}
      >
        <NotificationsProvider position="bottom-right" limit={5}>
          <Routes>
            {routes.map((route, index) => route.component(index))}
          </Routes>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
