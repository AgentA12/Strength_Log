import { Routes } from "react-router-dom";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { routes } from "./routes/routes";
import { createContext } from "react";
import auth from "./utils/auth/auth";

export const UserContext = createContext();

export function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const themeStyles = {
    colorScheme: colorScheme,

    focusRingStyles: {
      resetStyles: () => ({ outline: "none" }),

      
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
          <UserContext.Provider value={auth.getInfo()}>
            <Routes>
              {routes.map((route, index) => route.component(index))}
            </Routes>
          </UserContext.Provider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
