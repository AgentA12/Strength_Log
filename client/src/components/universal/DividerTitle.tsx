import classes from "./css/dividertitle.module.css";
import { Divider, Title } from "@mantine/core";

interface Props {
  name: string;
  fs?: string;
  fw?: string;
}
export default function DividerTitle({ name, fs, fw }: Props) {
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
