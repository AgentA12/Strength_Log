import { Nav } from "./components/navbar/Nav";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProgressPage } from "./pages/progressPage";
import CreateTemplate from "./components/templates/CreateTemplateContainer";
import EditTemplate from "./components/templates/EditTemplateContainer";
import Protected from "./components/ProtectedRoute";
import auth from "./utils/auth/auth";
import { TemplatePage } from "./pages/templatesPage";
import LandingPage from "./pages/landingPage";
import { NotFound } from "./pages/notFound";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const toggleColorScheme = (ColorScheme) =>
    setColorScheme(colorScheme === "dark" ? "light" : "dark");

  const { pathname } = useLocation();

  const isLoggedIn = auth.isLoggedIn();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        inherit
        theme={{
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
        }}
      >
        <NotificationsProvider position="bottom-right" limit={5}>
          <Routes>
            <Route
              path="/"
              index
              element={<LandingPage isLoggedIn={isLoggedIn} />}
            />

            <Route
              path="/Templates"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Nav activeNav={pathname.replace("/", "")} />
                  <TemplatePage />
                </Protected>
              }
            />

            <Route
              path="Templates/Create-Template"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Nav activeNav={pathname.replace("/", "")} />
                  <CreateTemplate />
                </Protected>
              }
            />

            <Route
              path="/Edit-Template"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Nav activeNav={pathname.replace("/", "")} />
                  <EditTemplate />
                </Protected>
              }
            />
            <Route
              path="/Progress"
              element={
                <Protected isLoggedIn={isLoggedIn}>
                  <Nav activeNav={pathname.replace("/", "")} />
                  <ProgressPage />
                </Protected>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
