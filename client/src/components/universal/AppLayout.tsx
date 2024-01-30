import { AppShell, Burger, Title, Group, Box } from "@mantine/core";
import { SideNav } from "../navbar";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlineThunderbolt } from "react-icons/ai";

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
        <Group wrap="nowrap" h="100%" px="md" justify="space-around">
          <Group  gap={0} align="center" justify="center">
            <Title order={2}>Strength Log</Title>
            <AiOutlineThunderbolt
              style={{
                alignSelf: "start",
                justifySelf: "start",
              }}
              size={24}
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
