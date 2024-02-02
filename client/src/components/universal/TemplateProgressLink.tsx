import { Text, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./css/templatelink.module.css"

interface Props {
  templateName: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
export default function TemplateProgressLink({ templateName, size }: Props) {
  const { primaryColor } = useMantineTheme();
  return (
    <Text
      component={Link}
      tt="capitalize"
      to={`/progress`}
      c={`${primaryColor}.6`}
      className={classes.link}
      size={size ? size : "md"}
      state={{
        activeTab: "templates",
        templateName: templateName,
      }}
    >
      {templateName}
    </Text>
  );
}
