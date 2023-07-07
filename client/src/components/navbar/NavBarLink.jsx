import { Link } from "react-router-dom";
import { Tooltip, Box, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  link: {
    width: 45,
    height: 45,
    marginTop: 5,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export default function NavbarLink({
  icon: Icon,
  label,
  active,
  link,
}) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Box
        
        component={Link}
        to={link}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1rem" stroke={1.5} />
      </Box>
    </Tooltip>
  );
}
