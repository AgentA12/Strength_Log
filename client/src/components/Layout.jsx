import { AppShell, createStyles } from "@mantine/core";
import { SideNav } from "./navbar";

const useStyles = createStyles((theme) => ({
  container: {
    marginLeft: 80,
    marginTop: 25,
    [theme.fn.smallerThan("sm")]: {
      margin: "auto",
      marginBottom: 150,
      padding: 0,
    },
  },
}));

export default function AppLayout({ children }) {
  const { classes } = useStyles();
  return (
    <AppShell className={classes.container} navbar={<SideNav />}>
      {children}
    </AppShell>
  );
}
