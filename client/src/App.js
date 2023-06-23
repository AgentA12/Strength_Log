import { Routes } from "react-router-dom";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { routes } from "./routes/routes";
import { createContext, useEffect } from "react";
import Layout from "./components/Layout";

import auth from "./utils/auth/auth";

export const UserContext = createContext();

export function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
  });

  const themeStyles = {
    colorScheme: colorScheme,
    colors: {
      "hot-pink": [
        "#F7E8F0",
        "#F2C2DA",
        "#F498C6",
        "#FF69B4",
        "#EC58A2",
        "#D84C92",
        "#C34483",
        "#A64676",
        "#8D476A",
        "#794760",
      ],
    },
    primaryColor: "hot-pink",
  };

  useHotkeys([["ctrl+K", () => toggleColorScheme()]]);

  const toggleColorScheme = () =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  //stops useless error when resizing browser
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message === "ResizeObserver loop limit exceeded") {
        const resizeObserverErrDiv = document.getElementById(
          "webpack-dev-server-client-overlay-div"
        );
        const resizeObserverErr = document.getElementById(
          "webpack-dev-server-client-overlay"
        );
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute("style", "display: none");
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute("style", "display: none");
        }
      }
    });
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider withNormalizeCSS withGlobalStyles theme={themeStyles}>
        <Notifications position="bottom-right" limit={5} />
        <UserContext.Provider value={auth.getInfo()}>
          <Layout>
            <Routes>
              {routes.map((route, index) => route.component(index))}
            </Routes>
          </Layout>
        </UserContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
