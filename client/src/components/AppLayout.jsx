import { AppShell, Burger, Title, Group } from "@mantine/core";
import { SideNav } from "./navbar";
import { useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineThunderbolt } from "react-icons/ai";

const pathHasNavBar = {
  "/": false,
  "/login": false,
  "/Create-template": true,
  "/Edit-template": true,
  "/Dashboard": true,
  "/Progress": true,
  "/Settings": true,
  "/Workout": true,
  "/Utilities": true,
  "/notFound": false,
};

export default function AppLayout({ children }) {
  const { pathname } = useLocation();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 175,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={{ base: "xs", sm: "md" }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />

          <Group gap={0} align="center" justify="center">
            <Title order={2}>Strength Log</Title>
            <AiOutlineThunderbolt
              style={{ alignSelf: "start", justifySelf: "start" }}
              size={25}
            />
          </Group>
        </Group>
      </AppShell.Header>

      {pathHasNavBar[pathname] && (
        <AppShell.Navbar p="md">
          <SideNav toggleDesktop={toggleDesktop} toggleMobile={toggleMobile} />
        </AppShell.Navbar>
      )}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
