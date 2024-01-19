import classes from "./dividertitle.module.css";
import { Divider, Title } from "@mantine/core";

export default function DividerTitle({
  name,
  fs,
  fw,
}: {
  name: string;
  fs?: string;
  fw?: string;
}) {
  return (
    <Divider
      tt="capitalize"
      label={
        <Title
          fs={fs ? fs : ""}
          fw={fw ? fw : ""}
          className={classes.dividertitle}
        >
          {name}
        </Title>
      }
    />
  );
}
