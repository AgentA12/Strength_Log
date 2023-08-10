import { AppShell, createStyles } from "@mantine/core";
import { SideNav } from "./navbar";
import { useLocation } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  container: {
    marginLeft: 80,
    [theme.fn.smallerThan("sm")]: {
      margin: "auto",
      marginBottom: 150,
      padding: 0,
    },
  },
}));

const pathHasNavBar = {
  "/login": false,
  "/Create-template": true,
  "/Edit-template": true,
  "/Home": true,
  "/Progress": true,
  "/Settings": true,
};

export default function AppLayout({ children }) {
  const { pathname } = useLocation();
  const { classes } = useStyles();
  return (
    <>
      {pathHasNavBar[pathname] ? (
        <AppShell className={classes.container} navbar={<SideNav />}>
          {children}
        </AppShell>
      ) : (
        <AppShell className={classes.container}>{children}</AppShell>
      )}
    </>
  );
}
