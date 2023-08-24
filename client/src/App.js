import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";
import { createContext, useEffect } from "react";
import Layout from "./components/Layout";
import RouteContainer from "./routes/routes";

import auth from "./utils/auth/auth";
import ScrollToTop from "./components/ScrollToTop";

export const UserContext = createContext();

export function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
  });

  const themeStyles = {
    fontFamily: "Inter",
    colorScheme: colorScheme,
    loader: "bars",
    colors: {
      brand: [
        "#F0BBDD",
        "#ED9BCF",
        "#EC7CC3",
        "#ED5DB8",
        "#F13EAF",
        "#F71FA7",
        "#FF00A1",
        "#E00890",
        "#C50E82",
        "#AD1374",
      ],
    },
    primaryColor: "brand",
    components: {
      Button: {
        defaultProps: {
          variant: "outline",
        },
      },
    },
    globalSyles: (theme) => ({}),
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
            <RouteContainer />
            <ScrollToTop />
          </Layout>
        </UserContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
