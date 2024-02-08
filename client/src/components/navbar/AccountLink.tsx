import { Box, Menu, Text, rem, useMantineColorScheme } from "@mantine/core";
import { IconSettings, IconLogout } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./css/AccountLink.module.css";
import { BsSun, BsMoon } from "react-icons/bs";
import { useAuth } from "../../contexts/auth";
import { useUserInfo } from "../../contexts/userInfo";

export default function AccountLink() {
  const userInfo = useUserInfo();

  const username = userInfo?.data.username;

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { setToken }: any = useAuth();

  const dark = colorScheme === "dark";

  const handleLogout = () => {
    setToken();
  };

  return (
    <Box>
      <Menu
        shadow="md"
        width={200}
        transitionProps={{
          transition: "pop",
        }}
      >
        <Menu.Target>
          <Box
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              cursor: "pointer",
              background: "linear-gradient(180deg, #bf25d6 0%, #c0f517 100%)",
            }}
          ></Box>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label ta="center">
          
            <Text c="dimmed" size="sm">{username}'s account</Text>
          </Menu.Label>
          <Menu.Divider />
          <Menu.Item
            component={Link}
            to="/settings"
            className={classes.accountlink}
            rightSection={
              <IconSettings style={{ width: rem(14), height: rem(14) }} />
            }
          >
            <Text size="sm">Settings</Text>
          </Menu.Item>

          <Menu.Item
            className={classes.accountlink}
            onClick={() => toggleColorScheme()}
            rightSection={
              <Box>
                {dark ? <BsSun size="0.9rem" /> : <BsMoon size="0.9rem" />}
              </Box>
            }
          >
            <Text size="sm">Switch to {dark ? "Light" : "Dark"}</Text>
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            className={classes.accountlink}
            onClick={handleLogout}
            rightSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
