import { useMediaQuery } from "@mantine/hooks";
import classes from "./css/dividertitle.module.css";
import { Box, Divider, Title, em } from "@mantine/core";
import { ReactNode } from "react";

interface Props {
  name: string | ReactNode;
  fs?: string;
  fw?: string;
}
export default function DividerTitle({ name, fs = "italic", fw }: Props) {
  const isMobile = useMediaQuery(`(max-width: 767px)`);

  return (
    <Box mb={20}>
      <Title
        ml={isMobile ? 0 : 55}
        pb={20}
        ta={isMobile ? "center" : "left"}
        tt="capitalize"
        fs={fs ? fs : ""}
        fw={fw ? fw : ""}
        className={classes.dividertitle}
      >
        {name}
      </Title>
      <Divider />
    </Box>
  );
}
