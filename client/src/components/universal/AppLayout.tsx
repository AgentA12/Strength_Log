import { AppShell, Burger, Title, Group, Box, Image } from "@mantine/core";
import { SideNav } from "../navbar";
import { useDisclosure } from "@mantine/hooks";

interface Props {
  children: React.ReactNode;
  hasNav: boolean;
}
export default function AppLayout({ children, hasNav }: Props) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: 80 }}
      navbar={{
        width: 175,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: true },
      }}
      padding={{ base: "xs", sm: "md" }}
    >
      <AppShell.Header>
        <Group wrap="nowrap" h="100%" justify="space-around">
          <Group gap={2} align="center" justify="center">
            <Title order={2}>Strength Log</Title>
            <Image
              style={{
                alignSelf: "start",
                justifySelf: "start",
                marginTop: -8,
              }}
              src="./i-32.png"
              alt="strength log logo"
            />
          </Group>
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Box visibleFrom="sm">
            <SideNav direction="row" toggleMobile={toggleMobile} />
          </Box>
        </Group>
      </AppShell.Header>

      {hasNav && (
        <AppShell.Navbar hiddenFrom="sm" p="sm">
          <SideNav direction="column" toggleMobile={toggleMobile} />
        </AppShell.Navbar>
      )}

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
