import { AppShell, Burger, Title, Group, useMantineTheme } from "@mantine/core";
import { SideNav } from "../navbar";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineThunderbolt } from "react-icons/ai";

interface Props {
  children: React.ReactNode;
  hasNav: boolean;
}
export default function AppLayout({ children, hasNav }: Props) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const theme = useMantineTheme();

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

      {hasNav && (
        <AppShell.Navbar p="sm">
          <SideNav toggleMobile={toggleMobile} />
        </AppShell.Navbar>
      )}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
